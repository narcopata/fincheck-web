import type { TransactionType } from "@constants/transactionTypes";
import type { Transaction } from "@entities/Transaction";
import { httpClient } from "@services/httpClient";

type Params = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: TransactionType;
};

export const getAll = async (queryParams: Params) => {
  const data = await httpClient
    .get("transactions", {
      searchParams: queryParams,
    })
    .json<Transaction[]>();

  return data;
};

export { Params as GetAllTransactionsParams };
