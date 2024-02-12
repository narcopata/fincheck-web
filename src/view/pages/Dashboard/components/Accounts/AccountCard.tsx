import type { BankAccountType } from "@constants/bankAccountTypes";
import { cn } from "@utils/cn";
import { formatCurrency } from "@utils/formatCurrency";
import type { FunctionComponent } from "preact";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";
import { BankAccountTypeIcon } from "../icons/BankAccountTypeIcon";

type Props = {
  color: string;
  name: string;
  balance: number;
  type: BankAccountType;
};

export const AccountCard: FunctionComponent<Props> = ({
  balance,
  color,
  name,
  type,
}) => {
  const { areValuesVisible } = useDashboard();

  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{
        borderColor: color,
      }}
    >
      <div>
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            "text-gray-800 font-medium tracking-[-0.5px] block",
            !areValuesVisible && "blur-sm",
          )}
        >
          {formatCurrency(balance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  );
};
