export const TRANSACTION_TYPES = Object.freeze({
  EXPENSE: "expense",
  INCOME: "income",
});

export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];
