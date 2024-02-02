import { type Provider, createContext } from "preact";
import { useCallback, useMemo, useReducer, useState } from "preact/hooks";

type Props = {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
  modals: {
    newAccount: {
      isOpen: boolean;
      open(): void;
      close(): void;
    };
  };
};

export const DashboardContext = createContext<Props | null>(null);

export const DashboardProvider: Provider<Props | null> = ({ children }) => {
  const [areValuesVisible, toggleValuesVisibility] = useReducer(
    (s: boolean) => !s,
    true,
  );

  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);

  const openNewAccountModal: Props["modals"]["newAccount"]["open"] =
    useCallback(() => {
      setIsNewAccountModalOpen(true);
    }, []);

  const closeAccountModalOpen: Props["modals"]["newAccount"]["close"] =
    useCallback(() => {
      setIsNewAccountModalOpen(false);
    }, []);

  const contextValue = useMemo<Props>(
    () => ({
      areValuesVisible,
      toggleValuesVisibility:
        toggleValuesVisibility as Props["toggleValuesVisibility"],
      modals: {
        newAccount: {
          isOpen: isNewAccountModalOpen,
          close: closeAccountModalOpen,
          open: openNewAccountModal,
        },
      },
    }),
    [
      areValuesVisible,
      isNewAccountModalOpen,
      closeAccountModalOpen,
      openNewAccountModal,
    ],
  );

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};
