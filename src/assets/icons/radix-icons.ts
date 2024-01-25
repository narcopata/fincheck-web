import * as AllRadixIcons from "@radix-ui/react-icons";
import type { FunctionComponent } from "preact";
import type { SVGProps } from "preact/compat";

export type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

export const ChevronLeftIcon: FunctionComponent<IconProps> =
  AllRadixIcons.ChevronLeftIcon;
export const ChevronRightIcon: FunctionComponent<IconProps> =
  AllRadixIcons.ChevronRightIcon;
export const ChevronDownIcon: FunctionComponent<IconProps> =
  AllRadixIcons.ChevronDownIcon;
export const PlusIcon: FunctionComponent<IconProps> = AllRadixIcons.PlusIcon;
export const ExitIcon: FunctionComponent<IconProps> = AllRadixIcons.ExitIcon;
