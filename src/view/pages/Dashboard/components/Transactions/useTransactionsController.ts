import { useDashboard } from "../../contexts/Dashboard/useDashboard";

export const useTransactionsController = () => {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    isFirstLoading: true,
    isNextLoading: false,
    transactions: [],
  };
};
