import type { ComponentProps, FunctionComponent } from "preact";

import { cn } from "@utils/cn";

import { Spinner } from "../Spinner";

type ButtonProps = ComponentProps<"button"> & {
  isPending?: boolean;
  variant?: "danger" | "ghost";
};

export const Button: FunctionComponent<ButtonProps> = ({
  className,
  type = "button",
  isPending,
  disabled,
  children,
  variant,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || isPending}
      className={cn(
        "bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed text-white px-6 h-12 rounded-2xl font-medium transition-all flex items-center justify-center",
        variant === "danger" && "bg-red-900 hover:bg-red-800",
        variant === "ghost" &&
          "bg-transparent border border-gray-800 hover:bg-gray-800/5 text-gray-800",
        className,
      )}
      type={type}
    >
      {isPending ? <Spinner className="w-6 h-6" /> : children}
    </button>
  );
};
