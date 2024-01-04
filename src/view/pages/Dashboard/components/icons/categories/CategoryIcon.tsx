import { iconsMap } from "./iconsMap";

interface CategoryIconProps {
  type: "income" | "expense";
  category?: string;
}

export const CategoryIcon = ({ type, category }: CategoryIconProps) => {
  // biome-ignore lint/style/useNamingConvention: <explanation>
  const Icon =
    iconsMap[type][
      (category as keyof (typeof iconsMap.expense | typeof iconsMap.income)) ??
        "default"
    ] ?? iconsMap[type].default;

  return <Icon />;
}
