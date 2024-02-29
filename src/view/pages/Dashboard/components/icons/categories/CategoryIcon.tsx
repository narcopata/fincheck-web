import type { TransactionType } from "@constants/transactionTypes";
import { iconsMap } from "./iconsMap";

interface CategoryIconProps {
  type: TransactionType;
  category?: string;
}

export const CategoryIcon = ({ type, category }: CategoryIconProps) => {
  const Icon =
    iconsMap[type][
      (category as keyof (typeof iconsMap.expense | typeof iconsMap.income)) ??
        "default"
    ] ?? iconsMap[type].default;

  return <Icon />;
};
