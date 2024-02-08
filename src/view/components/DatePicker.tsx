import { capitalizeFirstLetter } from "@utils/capitalizeFirstLetter";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { FunctionComponent } from "preact";
import { DayPicker, type DayPickerProps } from "react-day-picker";

type Props = {
  value: Date;
  onChange?: (date: Date) => void;
} & DayPickerProps;

export const DatePicker: FunctionComponent<Props> = ({ value, onChange }) => {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date: Date) => onChange?.(date ?? new Date())}
      classNames={{
        caption: "flex items-center justify-between",
        nav: "flex gap-1",
        nav_button_next:
          "text-teal-800 flex items-center justify-center !bg-transparent",
        nav_button_previous:
          "text-teal-800 flex items-center justify-center !bg-transparent",
        head_cell: "uppercase text-xs text-gray-500 font-medium pt-1 pb-2",
        button:
          "text-gray-700 cursor-pointer w-10 h-10 hover:bg-teal-100 rounded-full",
        day_today: "bg-gray-100 font-bold text-gray-900",
        day_selected: "!bg-teal-900 text-white font-medium",
      }}
      formatters={{
        formatCaption: (date, options) => {
          return (
            <span className="text-gray-900 tracking-[-0.4px] font-medium">
              {capitalizeFirstLetter(format(date, "LLLL yyyy", options))}
            </span>
          );
        },
      }}
    />
  );
};
