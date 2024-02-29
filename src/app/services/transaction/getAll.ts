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
  const cleanedQueryParams = (
    Object.keys(queryParams) as (keyof Params)[]
  ).reduce((acc, currentEntry) => {
    const valueFromCurrentKey = queryParams[currentEntry];

    if (valueFromCurrentKey !== undefined) {
      (acc as Record<keyof Params, unknown>)[currentEntry] =
        valueFromCurrentKey;
    }

    return acc;
  }, {} as Params);

  const data = await httpClient
    .get("transactions", {
      searchParams: cleanedQueryParams,
    })
    .json<Transaction[]>();

  return data;
};

export { Params as GetAllTransactionsParams };
