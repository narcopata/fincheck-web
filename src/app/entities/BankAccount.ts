import type { BankAccountType } from "@constants/bankAccountTypes";

export type BankAccount = {
  id: string;
  name: string;
  currentBalance: number;
  initialBalance: number;
  type: BankAccountType;
  color: string;
};
