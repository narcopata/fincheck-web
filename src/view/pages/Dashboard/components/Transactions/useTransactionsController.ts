import { useCallback, useState } from "preact/hooks";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";

export const useTransactionsController = () => {
  const { areValuesVisible } = useDashboard();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const handleOpenFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(true);
  }, []);

  const handleCloseFiltersModal = useCallback(() => {
    setIsFiltersModalOpen(false);
  }, []);

  return {
    areValuesVisible,
    isFirstLoading: true,
    isNextLoading: false,
    transactions: [],
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  };
};
