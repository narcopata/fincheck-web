import * as AllRadixIcons from "@radix-ui/react-icons";
import { FunctionComponent } from "preact";
import { SVGProps } from "preact/compat";

export type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
};

export const ChevronLeftIcon: FunctionComponent<IconProps> =
  AllRadixIcons.ChevronLeftIcon;
export const ChevronRightIcon: FunctionComponent<IconProps> =
  AllRadixIcons.ChevronRightIcon;
