import type { BankAccountType } from "@constants/bankAccountTypes";
import { httpClient } from "@services/httpClient";
import type { BankAccount } from "../../entities/BankAccount";

type Params = {
  initialBalance: number;
  type: BankAccountType;
  color: string;
  name: string;
};

type Response = BankAccount;

export const edit = async (params: Params): Promise<Response> => {
  const data = await httpClient
    .put("bank-accounts", {
      json: params,
    })
    .json<Response>();

  return data;
};
