const BANK_ACCOUNT_TYPES = Object.freeze({
  CHECKING: "checking",
  CASH: "cash",
  INVESTMENT: "investment",
});

type BankAccountType =
  (typeof BANK_ACCOUNT_TYPES)[keyof typeof BANK_ACCOUNT_TYPES];

export { BANK_ACCOUNT_TYPES, BankAccountType };
