import { ComponentProps, FunctionComponent } from "preact";

import s from './styles.module.css';

import { useComputed } from "@preact/signals";

import { cn } from "../../../app/utils/cn";

export const Input: FunctionComponent<InputProps> = ({
  placeholder,
  name,
  id,
  ...props
}) => {
  const inputId = useComputed(() =>
    typeof id === "string" ? id : id?.value ?? name,
  );

  return (
    <div className="relative">
      <input
        {...props}
        id={inputId}
        name={name}
        placeholder=" "
          className={cn(
            "bg-white w-full rounded-lg border border-gray-500 text-gray-800 px-3 pt-4 h-[52px] focus:border-gray-800 transition-all  placeholder-shown:pt-0 outline-none",
            {
              "!border-red-900": !!errorMessage,
            },
          )}
        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 transition-all
          peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5}"
        >
    </div>
  );
};
