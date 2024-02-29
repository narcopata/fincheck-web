import type { ColorKey } from "@constants/colors";
import type { TransactionType } from "@constants/transactionTypes";
import type { BankAccount } from "@entities/BankAccount";
import { type Provider, createContext } from "preact";
import { useCallback, useMemo, useReducer, useState } from "preact/hooks";

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

const useNewAccountModal = (): Props["modals"]["newAccount"] => {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    open,
    isOpen,
    close,
  };
};

const useNewTransactionModal = (): Props["modals"]["newTransaction"] => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<TransactionType | null>(null);

  const open: Props["modals"]["newTransaction"]["open"] = useCallback(
    (type) => {
      setType(type);
      setIsOpen(true);
    },
    [],
  );

  const close: Props["modals"]["newTransaction"]["close"] = useCallback(() => {
    setType(null);
    setIsOpen(false);
  }, []);

  const data = useMemo(
    () => ({
      isOpen,
      type,
      close,
      open,
    }),
    [isOpen, type, close, open],
  );

  return data;
};

export const DashboardProvider: Provider<Props | null> = ({ children }) => {
  const [areValuesVisible, toggleValuesVisibility] = useReducer(
    (s: boolean) => !s,
    true,
  );

  const newAccountModalData = useNewAccountModal();

  const newTransactionModalData = useNewTransactionModal();

  const editAccountModalData = useEditAccountModal();

  const contextValue = useMemo<Props>(
    () => ({
      areValuesVisible,
      toggleValuesVisibility:
        toggleValuesVisibility as Props["toggleValuesVisibility"],
      modals: {
        newAccount: newAccountModalData,
        newTransaction: newTransactionModalData,
        editAccount: editAccountModalData,
      },
    }),
    [
      areValuesVisible,
      newAccountModalData,
      editAccountModalData,
      newTransactionModalData,
    ],
  );

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};
