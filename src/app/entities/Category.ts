import type { TransactionType } from "@constants/transactionTypes";

export type Category = {
  id: string;
  name: string;
  icon: string;
  type: TransactionType;
};
