import type { BankAccountType } from "@constants/bankAccountTypes";
import { httpClient } from "@services/httpClient";

type Response = Array<{
  id: string;
  userId: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
  currentBalance: number;
}>;

export const getAll = async () => {
  const data = await httpClient.get("bank-accounts").json<Response>();

  return data;
};
