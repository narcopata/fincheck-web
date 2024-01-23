import type { ComponentProps, FunctionComponent } from "preact";

import { cn } from "@utils/cn";

import { Spinner } from "../Spinner";

type ButtonProps = ComponentProps<"button"> & {
  isPending?: boolean;
};

export const Button: FunctionComponent<ButtonProps> = ({
  className,
  type = "button",
  isPending,
  disabled,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || isPending}
      className={cn(
        "hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white px-6 h-12 rounded-2xl font-medium transition-all flex items-center justify-center",
        className,
      )}
      type={type}
    >
      {isPending ? <Spinner className="w-6 h-6" /> : children}
    </button>
  );
};
