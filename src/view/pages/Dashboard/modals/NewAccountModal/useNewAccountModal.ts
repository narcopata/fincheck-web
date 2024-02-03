import { useDashboard } from "../../contexts/Dashboard/useDashboard";

export const useNewAccountModal = () => {
  const { modals } = useDashboard();

  return {
    modals,
  };
};
