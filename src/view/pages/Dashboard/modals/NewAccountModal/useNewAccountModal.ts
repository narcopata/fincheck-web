import { useDashboard } from "../../contexts/Dashboard/useDashboard";

export const useNewAccountModal = () => {
  const { isNewAccountModalOpen, closeAccountModalOpen } = useDashboard();

  return {
    isNewAccountModalOpen,
    closeAccountModalOpen,
  };
};
