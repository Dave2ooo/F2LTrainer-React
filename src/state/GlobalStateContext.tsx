import { useCallback, useRef, useSyncExternalStore } from "react";
import { createInitialGlobalState } from "@/types/group";
import type { CaseId, CaseState, GlobalState, Group } from "@/types/group";

const GLOBAL_STATE_STORAGE_KEY = "f2ltrainer.globalState";

type Listener = () => void;

type CaseStateUpdater = (caseState: CaseState) => CaseState;

const listeners = new Set<Listener>();

const emitChange = () => {
  listeners.forEach((listener) => {
    listener();
  });
};

const subscribe = (listener: Listener) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const applyCaseUpdate = (
  previousState: GlobalState,
  groupId: Group,
  caseId: CaseId,
  updater: CaseStateUpdater,
): GlobalState => {
  const groupState = previousState.groups[groupId];
  const caseState = groupState?.cases[caseId];

  if (!groupState || !caseState) {
    return previousState;
  }

  const nextCaseState = updater(caseState);

  if (nextCaseState === caseState) {
    return previousState;
  }

  return {
    ...previousState,
    groups: {
      ...previousState.groups,
      [groupId]: {
        ...groupState,
        cases: {
          ...groupState.cases,
          [caseId]: nextCaseState,
        },
      },
    },
  };
};

const loadGlobalState = (): GlobalState => {
  const initialState = createInitialGlobalState();

  if (typeof window === "undefined") {
    return initialState;
  }

  const storedState = window.localStorage.getItem(GLOBAL_STATE_STORAGE_KEY);

  if (!storedState) {
    return initialState;
  }

  try {
    const parsedState = JSON.parse(storedState) as Partial<GlobalState> | null;

    if (!parsedState || typeof parsedState !== "object") {
      return initialState;
    }

    const mergedGroups = parsedState.groups
      ? { ...initialState.groups, ...parsedState.groups }
      : initialState.groups;

    return {
      ...initialState,
      ...parsedState,
      groups: mergedGroups,
    } as GlobalState;
  } catch (error) {
    console.warn("Failed to parse stored global state, falling back to default.", error);
    return initialState;
  }
};

let globalState: GlobalState = loadGlobalState();

const getSnapshot = () => globalState;

const persistState = (value: GlobalState) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(GLOBAL_STATE_STORAGE_KEY, JSON.stringify(value));
  } catch (error) {
    console.warn("Failed to persist global state.", error);
  }
};

const setState = (updater: (previousState: GlobalState) => GlobalState) => {
  const nextState = updater(globalState);

  if (nextState === globalState) {
    return;
  }

  globalState = nextState;
  persistState(globalState);
  emitChange();
};

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key !== GLOBAL_STATE_STORAGE_KEY) {
      return;
    }

    if (!event.newValue) {
      globalState = createInitialGlobalState();
      emitChange();
      return;
    }

    try {
      const parsedState = JSON.parse(event.newValue) as GlobalState;
      globalState = parsedState;
      emitChange();
    } catch (error) {
      console.warn("Failed to synchronize global state from storage.", error);
    }
  });
}

const useGlobalStateSelector = <Selected,>(selector: (state: GlobalState) => Selected): Selected => {
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  const getSelectedSnapshot = useCallback(() => selectorRef.current(getSnapshot()), []);

  return useSyncExternalStore(subscribe, getSelectedSnapshot, getSelectedSnapshot);
};

export const useGlobalState = () => useGlobalStateSelector((state) => state);

export const useCaseState = (groupId: Group, caseId: CaseId) =>
  useGlobalStateSelector((state) => state.groups[groupId]?.cases[caseId]);

const updateCaseStateInternal = (groupId: Group, caseId: CaseId, updater: CaseStateUpdater) => {
  setState((previousState) => applyCaseUpdate(previousState, groupId, caseId, updater));
};

export const useUpdateCaseState = () =>
  useCallback(
    (groupId: Group, caseId: CaseId, updater: CaseStateUpdater) => {
      updateCaseStateInternal(groupId, caseId, updater);
    },
    [],
  );

export const updateCaseState = updateCaseStateInternal;

export const getGlobalState = () => globalState;
