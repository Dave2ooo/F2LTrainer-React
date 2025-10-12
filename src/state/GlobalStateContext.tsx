import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createInitialGlobalState } from "@/types/group";
import type { CaseId, CaseState, GlobalState, Group } from "@/types/group";

const GLOBAL_STATE_STORAGE_KEY = "f2ltrainer.globalState";

type GlobalStateContextValue = {
  state: GlobalState;
  setState: React.Dispatch<React.SetStateAction<GlobalState>>;
  updateCaseState: (
    groupId: Group,
    caseId: CaseId,
    updater: (caseState: CaseState) => CaseState,
  ) => void;
};

const GlobalStateContext = createContext<GlobalStateContextValue | undefined>(undefined);

const applyCaseUpdate = (
  previousState: GlobalState,
  groupId: Group,
  caseId: CaseId,
  updater: (caseState: CaseState) => CaseState,
): GlobalState => {
  const groupState = previousState.groups[groupId];
  const caseState = groupState?.cases[caseId];

  if (!groupState || !caseState) {
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
          [caseId]: updater(caseState),
        },
      },
    },
  };
};

const loadGlobalState = (): GlobalState => {
  if (typeof window === "undefined") {
    return createInitialGlobalState();
  }

  const storedState = window.localStorage.getItem(GLOBAL_STATE_STORAGE_KEY);

  if (!storedState) {
    return createInitialGlobalState();
  }

  try {
    const parsedState = JSON.parse(storedState) as Partial<GlobalState> | null;

    if (!parsedState || typeof parsedState !== "object") {
      return createInitialGlobalState();
    }

    const initialState = createInitialGlobalState();

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
    return createInitialGlobalState();
  }
};

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<GlobalState>(() => loadGlobalState());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(GLOBAL_STATE_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateCaseState = useCallback<GlobalStateContextValue["updateCaseState"]>(
    (groupId, caseId, updater) => {
      setState((previousState) => applyCaseUpdate(previousState, groupId, caseId, updater));
    },
    [setState],
  );

  const value = useMemo(
    () => ({
      state,
      setState,
      updateCaseState,
    }),
    [state, updateCaseState],
  );

  return <GlobalStateContext.Provider value={value}>{children}</GlobalStateContext.Provider>;
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }

  return context;
};
