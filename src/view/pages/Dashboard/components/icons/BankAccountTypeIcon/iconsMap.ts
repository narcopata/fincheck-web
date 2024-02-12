import {
  BANK_ACCOUNT_TYPES,
  type BankAccountType,
} from "@constants/bankAccountTypes";
import type { JSX } from "preact/jsx-runtime";
import { CashIcon } from "./CashIcon";
import { CheckingIcon } from "./CheckingIcon";
import { InvestmentIcon } from "./InvestmentIcon";

export const iconsMap: Record<BankAccountType, () => JSX.Element> = {
  [BANK_ACCOUNT_TYPES.CHECKING]: CheckingIcon,
  [BANK_ACCOUNT_TYPES.INVESTMENT]: InvestmentIcon,
  [BANK_ACCOUNT_TYPES.CASH]: CashIcon,
};
