import { useTransactions } from "@hooks/useTransactions";
import type { GetAllTransactionsParams } from "@services/transaction";
import { useCallback, useReducer, useState } from "preact/hooks";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";

type Action = {
  set: Partial<GetAllTransactionsParams>;
};

const filtersReducer = (state: GetAllTransactionsParams, action: Action) => {
  const newState = { ...state, ...action.set };

  return newState;
};

export const useTransactionsController = () => {
  const { areValuesVisible } = useDashboard();

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

  return {
    areValuesVisible,
    isFirstLoading: isLoading,
    isNextLoading: isPending,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filtersDispatch,
    filters,
    refetch,
  };
};
