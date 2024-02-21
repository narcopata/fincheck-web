import { DatePicker, type DatePickerProps } from "@components/DatePicker";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@utils/cn";
import { formatDate } from "@utils/formatDate";
import type { FunctionComponent } from "preact";
import { useCallback, useState } from "preact/hooks";
import { Popover } from "./Popover";

type Props = {
  errorMessage?: string;
  className?: string;
} & Partial<DatePickerProps>;

export const DatePickerInput: FunctionComponent<Props> = ({
  className,
  errorMessage,
  value,
  onInput,
}) => {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  const handleSelect = useCallback(
    (value: Date) => {
      setSelectedDate(value);
      onInput?.(value);
    },
    [onInput],
  );

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className={cn(
              "bg-white rounded-lg border border-gray-500 focus:border-gray-800 text-gray-700 w-full h-[52px] px-3 pt-4 outline-none transition-all text-left relative",
              {
                "!border-red-900": !!errorMessage,
              },
              className,
            )}
            type="button"
          >
            <span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none">
              Data
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onInput={handleSelect} />
        </Popover.Content>
      </Popover.Root>
      {errorMessage && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
