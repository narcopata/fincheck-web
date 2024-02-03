import type { ComponentProps } from "preact";

import { useComputed } from "@preact/signals";
import { forwardRef } from "preact/compat";

import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@utils/cn";

type InputProps = ComponentProps<"input"> & {
  name: string;
  errorMessage?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, name, id, errorMessage, className, ...props }, ref) => {
    const inputId = useComputed(() =>
      typeof id === "string" ? id : id?.value ?? name,
    );

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          id={inputId}
          name={name}
          placeholder=" "
          className={cn(
            "bg-white rounded-lg border border-gray-500 focus:border-gray-800 text-gray-800 placeholder-shown:pt-0 w-full h-[52px] px-3 pt-4 peer outline-none transition-all",
            {
              "!border-red-900": !!errorMessage,
            },
            className,
          )}
        />
        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 transition-all
          peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5"
        >
          {placeholder}
        </label>

        {errorMessage && (
          <div className="flex gap-2 mt-2 text-red-900">
            <CrossCircledIcon />
            <span className="text-xs">{errorMessage}</span>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
