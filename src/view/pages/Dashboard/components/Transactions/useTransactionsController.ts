import { useDashboard } from "../../contexts/Dashboard/useDashboard";

export const useTransactionsController = () => {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    isLoading: true,
  };
};
