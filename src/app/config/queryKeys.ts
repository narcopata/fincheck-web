export const QUERY_KEYS = Object.freeze({
  USERS_ME: Object.freeze(["users", "me"] as const),
  BANK_ACCOUNTS_ALL: Object.freeze(["bankAccounts", "all"] as const),
  BANK_ACCOUNTS_EDIT: Object.freeze(["bankAccounts", "edit"] as const),
  CATEGORIES_GET_ALL: Object.freeze(["categories", "all"] as const),
  TRANSACTIONS: Object.freeze({
    CREATE: Object.freeze(["transactions", "create"] as const),
    GET_ALL: Object.freeze(["transactions", "all"] as const),
    UPDATE: Object.freeze(["transactions", "update"] as const),
  }),
});
