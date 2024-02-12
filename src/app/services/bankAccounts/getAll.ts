import type { BankAccountType } from "@constants/bankAccountTypes";
import { httpClient } from "@services/httpClient";

type Response = {
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
  currentBalance: number;
}[];

export const getAll = async (params?: unknown) => {
  const data = await httpClient
    .get("/bank-accounts", {
      json: params,
    })
    .json<Response>();

  return data;
};
