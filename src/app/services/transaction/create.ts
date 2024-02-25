import type { TransactionType } from "@constants/transactionTypes";
import { httpClient } from "@services/httpClient";

type Params = {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string;
  type: TransactionType;
};

export const create = async (params: Params) => {
  const data = await httpClient
    .post("transactions", {
      json: params,
    })
    .json();

  return data;
};
