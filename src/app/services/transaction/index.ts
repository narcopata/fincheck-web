import { create } from "./create";
import { type GetAllTransactionsParams, getAll } from "./getAll";
import { remove } from "./remove";
import { update } from "./update";

export const transactionService = {
  create,
  getAll,
  update,
  remove,
};

export type { GetAllTransactionsParams };
