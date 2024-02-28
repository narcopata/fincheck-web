import { create } from "./create";
import { type GetAllTransactionsParams, getAll } from "./getAll";
import { update } from "./update";

export const transactionService = {
  create,
  getAll,
  update,
};

export type { GetAllTransactionsParams };
