import { QUERY_KEYS } from "@config/queryKeys";
import {
  type GetAllTransactionsParams,
  transactionService,
} from "@services/transaction";
import { useQuery } from "@tanstack/react-query";

export const useTransactions = (filters: GetAllTransactionsParams) => {
  const {
    data = [],
    isPending,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEYS.TRANSACTIONS.GET_ALL,
    queryFn: () => transactionService.getAll(filters),
  });

  return {
    transactions: data,
    isPending,
    isLoading,
    refetch,
  };
};
