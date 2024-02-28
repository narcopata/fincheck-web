import type { TransactionType } from "@constants/transactionTypes";

export type Transaction = {
  id: string;
  category?: {
    id: string;
    name: string;
    icon: string;
  };
  bankAccountId: string;
  name: string;
  value: number;
  date: string | Date;
  type: TransactionType;
};
