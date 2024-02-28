import type { Transaction } from "@entities/Transaction";
import { useTransactions } from "@hooks/useTransactions";
import type { GetAllTransactionsParams } from "@services/transaction";
import { useCallback, useMemo, useReducer, useState } from "preact/hooks";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";

type Action = {
  set: Partial<GetAllTransactionsParams>;
};

const filtersReducer = (state: GetAllTransactionsParams, action: Action) => {
  const newState = { ...state, ...action.set };

  return newState;
};

const useEditModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [transaction, setTransaction] = useState<null | Transaction>(null);

  const open = useCallback((transactionData: Transaction) => {
    setIsOpen(true);
    setTransaction(transactionData);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTransaction(null);
  }, []);

  const data = useMemo(
    () => ({ isOpen, open, close, transaction }),
    [isOpen, open, close, transaction],
  );

  return data;
};

export const useTransactionsController = () => {
  const { areValuesVisible } = useDashboard();

  const editModalData = useEditModal();

  const editModal = useMemo(() => editModalData, [editModalData]);

  const [filters, filtersDispatch] = useReducer(filtersReducer, {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const { transactions, isPending, isLoading, refetch } =
    useTransactions(filters);

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const handleOpenFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(true);
  }, []);

  const handleCloseFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(false);
  }, []);

  const filtersModal = useMemo(
    () => ({
      isOpen: isFiltersModalOpen,
      open: handleOpenFiltersModal,
      close: handleCloseFiltersModal,
    }),
    [isFiltersModalOpen, handleOpenFiltersModal, handleCloseFiltersModal],
  );

  return {
    areValuesVisible,
    isFirstLoading: isLoading,
    isNextLoading: isPending,
    transactions,

    filters,
    filtersDispatch,
    refetch,

    editModal,
    filtersModal,
  };
};
