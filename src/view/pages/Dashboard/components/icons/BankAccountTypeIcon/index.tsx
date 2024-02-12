import type { BankAccountType } from "@constants/bankAccountTypes";
import { iconsMap } from "./iconsMap";

interface BankAccountTypeIconProps {
  type: BankAccountType;
}

export function BankAccountTypeIcon({ type }: BankAccountTypeIconProps) {
  const Icon = iconsMap[type];

  return <Icon />;
}
