import { NumericFormat } from "react-number-format";

export const InputCurrency = () => {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      className="w-full border border-gray-800 text-[32px] font-bold tracking-[-1px] outline-none"
      defaultValue={0}
    />
  );
};
