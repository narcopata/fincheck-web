import { iconsMap } from "./iconsMap";

interface BankAccountTypeIconProps {
  type: keyof typeof iconsMap;
}

export function BankAccountTypeIcon({ type }: BankAccountTypeIconProps) {
  // biome-ignore lint/style/useNamingConvention: <explanation>
  const Icon = iconsMap[type];

  return <Icon />;
}
