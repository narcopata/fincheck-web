import { ComponentProps, FunctionComponent } from "preact";

import { cn } from "../../../app/utils/cn";

type ButtonProps = ComponentProps<"button">;

export const Button: FunctionComponent<ButtonProps> = ({className, type = "button", ...props}) => {
  return (
    <button {...props} className={cn("hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white px-6 h-12 rounded-2xl font-medium transition-all", className)} type={type} />
  );
};
