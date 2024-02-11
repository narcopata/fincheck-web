export const COLORS = Object.freeze({
  gray_2: { color: "#868E96", bg: "#F8F9FA" },
  red_1: { color: "#FA5252", bg: "#FFF5F5" },
  purple_3: { color: "#E64980", bg: "#FFF0F6" },
  purple_2: { color: "#BE4BDB", bg: "#F8F0FC" },
  purple_1: { color: "#7950F2", bg: "#F3F0FF" },
  blue_2: { color: "#4C6EF5", bg: "#EDF2FF" },
  blue_1: { color: "#228BE6", bg: "#E7F5FF" },
  green_4: { color: "#15AABF", bg: "#E3FAFC" },
  green_3: { color: "#12B886", bg: "#E6FCF5" },
  green_2: { color: "#40C057", bg: "#EBFBEE" },
  green_1: { color: "#82C91E", bg: "#F4FCE3" },
  yellow_1: { color: "#FAB005", bg: "#FFF9DB" },
  orange_1: { color: "#FD7E14", bg: "#FFF4E6" },
  gray_1: { color: "#212529", bg: "#F8F9FA" },
} satisfies Record<
  `${string}_${number}`,
  Record<"color" | "bg", `#${string}`>
>);

export type ColorObjType = typeof COLORS;

export type ColorKey = keyof ColorObjType;

export type ColorValue = ColorObjType[ColorKey];
