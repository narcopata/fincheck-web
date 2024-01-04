declare module "radix-icons" {
  import { FunctionComponent, SVGProps } from "preact";
  import * as AllRadixIcons from "@radix-ui/react-icons";

  export type IconProps = SVGProps<SVGSVGElement> & {
    className?: string;
  };

  export const ChevronLeftIcon: FunctionComponent<IconProps> = AllRadixIcons.ChevronLeftIcon;
  export const ChevronRightIcon: FunctionComponent<IconProps> = AllRadixIcons.ChevronRightIcon;
}
