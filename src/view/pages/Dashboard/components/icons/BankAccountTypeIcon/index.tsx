import { iconsMap } from "./iconsMap";

interface BankAccountTypeIconProps {
  type: keyof typeof iconsMap;
}

export function BankAccountTypeIcon({ type }: BankAccountTypeIconProps) {
  const _icon = iconsMap[type];

  return <Icon />;
}
