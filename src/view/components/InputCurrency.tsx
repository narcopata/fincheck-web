import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "@utils/cn";
import type { ComponentProps, FunctionComponent } from "preact";
import { NumericFormat } from "react-number-format";

type Props = {
  errorMessage?: string;
  onInput?: (value: string) => void;
} & Partial<Pick<ComponentProps<"input">, "value">>;

export const InputCurrency: FunctionComponent<Props> = ({
  errorMessage,
  onInput,
  value,
}) => {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        className={cn(
          "w-full border bg-white text-gray-900  border-gray-800 text-[32px] font-bold tracking-[-1px] outline-none",
          errorMessage && "text-red-900",
        )}
        defaultValue={0}
        onChange={(event: Event) =>
          onInput?.((event?.currentTarget as HTMLInputElement)?.value)
        }
        value={value as string}
      />

      {errorMessage && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
