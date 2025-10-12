import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createInitialGlobalState } from "@/types/group";
import type { GlobalState } from "@/types/group";

const GLOBAL_STATE_STORAGE_KEY = "f2ltrainer.globalState";

type GlobalStateContextValue = {
  state: GlobalState;
  setState: React.Dispatch<React.SetStateAction<GlobalState>>;
};

const GlobalStateContext = createContext<GlobalStateContextValue | undefined>(undefined);

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

  const value = useMemo(
    () => ({
      state,
      setState,
    }),
    [state],
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
