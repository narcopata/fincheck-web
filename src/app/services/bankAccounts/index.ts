import { create } from "./create";
import { deleteAccount } from "./delete";
/* import { delete } from "./delete"; */
import { edit } from "./edit";
import { getAll } from "./getAll";

export const bankAccountService = {
  create,
  getAll,
  edit,
  delete: deleteAccount,
};
