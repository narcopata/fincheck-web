import { QUERY_KEYS } from "@config/queryKeys";
import { bankAccountService } from "@services/bankAccounts";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "preact/hooks";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";

export const useAccountsController = () => {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, modals } = useDashboard();

  const { data = [], isPending } = useQuery({
    queryKey: QUERY_KEYS.BANK_ACCOUNTS_ALL,
    queryFn: bankAccountService.getAll,
  });

  const totalCurrentBalance = useMemo(() => {
    if (!data.length) {
      return 0;
    }

    return data.reduce((acc, currentAccount) => {
      return acc + currentAccount.currentBalance;
    }, 0);
  }, [data]);

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
    accounts: data,
    totalCurrentBalance,
  };
};
