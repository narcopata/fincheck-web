import type { ComponentProps, FunctionComponent } from "preact";

import { ChevronDownIcon } from "@assets/icons/radix-icons";
import { ChevronUpIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import * as RdxSelect from "@radix-ui/react-select";
import { cn } from "@utils/cn";
import { useCallback, useState } from "preact/hooks";

type Option = {
  value: string;
  label: string;
};

type SelectProps = Omit<ComponentProps<"select">, "options"> & {
  errorMessage?: string;
  placeholder?: string;
  options: Option[];
  onInput?: (value: string) => void;
};

export const Select: FunctionComponent<SelectProps> = ({
  className,
  errorMessage,
  placeholder,
  options,
  value,
  onInput,
}) => {
  const [selectedValue, setSelectedValue] = useState(value ?? "");

  const handleSelect = useCallback(
    (value: string) => {
      setSelectedValue(value);
      onInput?.(value);
    },
    [onInput],
  );

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            "absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none",
            {
              "text-xs left-[13px] top-2 transition-all translate-y-0":
                selectedValue,
            },
          )}
        >
          {placeholder}
        </label>

        <RdxSelect.Root
          onValueChange={(value) => handleSelect(value)}
          value={value as string}
        >
          <RdxSelect.Trigger
            className={cn(
              "bg-white rounded-lg border border-gray-500 focus:border-gray-800 text-gray-800 w-full h-[52px] px-3 outline-none transition-all text-left relative pt-4",
              {
                "!border-red-900": !!errorMessage,
              },
              className,
            )}
          >
            <RdxSelect.Value />
            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>
          <RdxSelect.Portal>
            <RdxSelect.Content className="z-[99] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
              <RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2">
                {options.map(({ label, value }) => (
                  <RdxSelect.Item
                    className={cn(
                      "p-2 text-gray-800 text-sm data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-50 rounded-lg transition-colors",
                    )}
                    key={value}
                    value={value}
                  >
                    <RdxSelect.ItemText>{label}</RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {errorMessage && (
        <div className="flex gap-2 mt-2 items-center text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
