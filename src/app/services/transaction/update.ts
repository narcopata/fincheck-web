import type { TransactionType } from "@constants/transactionTypes";
import { httpClient } from "@services/httpClient";

type Params = {
  id: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  date: string | Date;
  type: TransactionType;
};

export const update = async ({ id, ...params }: Params) => {
  const data = await httpClient
    .put(`transactions/${id}`, {
      json: params,
    })
    .json();
  return data;
};
