import type { BankAccountType } from "@constants/bankAccountTypes";
import type { BankAccount } from "@entities/BankAccount";
import { httpClient } from "@services/httpClient";

type Params = {
  id: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
  name: string;
};

type Response = BankAccount;

export const edit = async ({ id, ...params }: Params): Promise<Response> => {
  const data = await httpClient
    .put(`bank-accounts/${id}`, {
      json: params,
    })
    .json<Response>();

  return data;
};
