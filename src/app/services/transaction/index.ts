import { create } from "./create";
import { type GetAllTransactionsParams, getAll } from "./getAll";

export const transactionService = {
  create,
  getAll,
};

export type { GetAllTransactionsParams };
