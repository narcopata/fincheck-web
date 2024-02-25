import { useBankAccount } from "@hooks/useBankAccount";
import { useWindowWidth } from "@hooks/useWindowWidth";
import { useMemo, useState } from "preact/hooks";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";

export const useAccountsController = () => {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, modals } = useDashboard();

  const { accounts, isPending } = useBankAccount();

  const totalCurrentBalance = useMemo(() => {
    return accounts.reduce((acc, currentAccount) => {
      return acc + currentAccount.currentBalance;
    }, 0);
  }, [accounts]);

  const [slider, setSlider] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    slider,
    setSlider,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    modals,
    isLoading: isPending,
    accounts,
    totalCurrentBalance,
  };
};
