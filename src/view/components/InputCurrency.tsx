import { NumericFormat } from "react-number-format";

export const InputCurrency = () => {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        className="w-full border bg-white text-gray-900  border-gray-800 text-[32px] font-bold tracking-[-1px] outline-none"
        defaultValue={0}
      />
    </div>
  );
};
