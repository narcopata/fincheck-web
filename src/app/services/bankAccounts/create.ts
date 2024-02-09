import type { BankAccountType } from "@constants/bankAccountTypes";
import { httpClient } from "@services/httpClient";

type Params = {
  initialBalance: number;
  type: BankAccountType;
  color: string;
  name: string;
};

type Response = {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
};

export const create = async (params: Params): Promise<Response> => {
  const data = await httpClient
    .post("bank-accounts", {
      json: params,
    })
    .json<Response>();

  return data;
};
