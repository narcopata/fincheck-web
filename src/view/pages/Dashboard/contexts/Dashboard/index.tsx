import type { ColorKey } from "@constants/colors";
import { type Provider, createContext } from "preact";
import { useCallback, useMemo, useReducer, useState } from "preact/hooks";
import type { BankAccount } from "../../../../../app/entities/BankAccount";

type TransactionType = "income" | "expense";

type ModalBankAccount = Omit<BankAccount, "color"> & Record<"color", ColorKey>;

type Props = {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
  modals: {
    newAccount: {
      isOpen: boolean;
      open(): void;
      close(): void;
    };
    newTransaction: {
      isOpen: boolean;
      type: TransactionType | null;
      open(type: TransactionType): void;
      close(): void;
    };
    editAccount: {
      isOpen: boolean;
      open(account: ModalBankAccount): void;
      close(): void;
      account: ModalBankAccount | null;
    };
  };
};

export const DashboardContext = createContext<Props | null>(null);

const useEditAccountModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState<ModalBankAccount | null>(null);

  const open = useCallback((bankAccount: ModalBankAccount) => {
    setIsOpen(true);
    setAccount(bankAccount);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setAccount(null);
  }, []);

  const data = useMemo(
    () => ({
      open,
      close,
      isOpen,
      account,
    }),
    [open, close, isOpen, account],
  );

  return data;
};

export const DashboardProvider: Provider<Props | null> = ({ children }) => {
  const [areValuesVisible, toggleValuesVisibility] = useReducer(
    (s: boolean) => !s,
    true,
  );

  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);
  const [newTransactionType, setNewTransactionType] =
    useState<TransactionType | null>(null);

  const openNewAccountModal: Props["modals"]["newAccount"]["open"] =
    useCallback(() => {
      setIsNewAccountModalOpen(true);
    }, []);

  const closeAccountModal: Props["modals"]["newAccount"]["close"] =
    useCallback(() => {
      setIsNewAccountModalOpen(false);
    }, []);

  const openNewTransactionModal: Props["modals"]["newTransaction"]["open"] =
    useCallback((type) => {
      setNewTransactionType(type);
      setIsNewTransactionModalOpen(true);
    }, []);

  const closeTransactionModal: Props["modals"]["newTransaction"]["close"] =
    useCallback(() => {
      setNewTransactionType(null);
      setIsNewTransactionModalOpen(false);
    }, []);

  const editAccountModalData = useEditAccountModal();

  const contextValue = useMemo<Props>(
    () => ({
      areValuesVisible,
      toggleValuesVisibility:
        toggleValuesVisibility as Props["toggleValuesVisibility"],
      modals: {
        newAccount: {
          isOpen: isNewAccountModalOpen,
          close: closeAccountModal,
          open: openNewAccountModal,
        },
        newTransaction: {
          close: closeTransactionModal,
          open: openNewTransactionModal,
          isOpen: isNewTransactionModalOpen,
          type: newTransactionType,
        },
        editAccount: editAccountModalData,
      },
    }),
    [
      areValuesVisible,
      isNewAccountModalOpen,
      closeAccountModal,
      openNewAccountModal,
      closeTransactionModal,
      openNewTransactionModal,
      isNewTransactionModalOpen,
      newTransactionType,
      editAccountModalData,
    ],
  );

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};
