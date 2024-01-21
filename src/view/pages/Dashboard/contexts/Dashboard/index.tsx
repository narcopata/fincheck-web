import { type Provider, createContext } from "preact";
import { useMemo, useReducer } from "preact/hooks";

type Props = {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
};

export const DashboardContext = createContext<Props | null>(null);

export const DashboardProvider: Provider<Props | null> = ({ children }) => {
  const [areValuesVisible, toggleValuesVisibility] = useReducer(
    (s: boolean) => !s,
    true,
  );

  const contextValue = useMemo<Props>(
    () => ({
      areValuesVisible,
      toggleValuesVisibility:
        toggleValuesVisibility as Props["toggleValuesVisibility"],
    }),
    [areValuesVisible],
  );

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};
