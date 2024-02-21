import { QUERY_KEYS } from "@config/queryKeys";
import { bankAccountService } from "@services/bankAccounts";
import { useQuery } from "@tanstack/react-query";

export const useBankAccount = () => {
  const { data = [], isPending } = useQuery({
    queryKey: QUERY_KEYS.BANK_ACCOUNTS_ALL,
    queryFn: bankAccountService.getAll,
  });

  return {
    accounts: data,
    isPending,
  };
};
