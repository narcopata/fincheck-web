import type { ColorKey } from "@constants/colors";
import type { BankAccount } from "@entities/BankAccount";
import { cn } from "@utils/cn";
import { formatCurrency } from "@utils/formatCurrency";
import type { FunctionComponent } from "preact";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";
import { BankAccountTypeIcon } from "../icons/BankAccountTypeIcon";

type Props = {
  data: BankAccount & Record<"colorKey", ColorKey>;
};

export const AccountCard: FunctionComponent<Props> = ({
  data: { colorKey, color, ...data },
}) => {
  const { areValuesVisible, modals } = useDashboard();

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-4 border-teal-950"
      style={{
        borderColor: color,
      }}
      role="button"
      onClick={() => {
        modals.editAccount.open({ ...data, color: colorKey });
      }}
    >
      <div>
        <BankAccountTypeIcon type={data.type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {data.name}
        </span>
      </div>

      <div>
        <span
          className={cn(
            "text-gray-800 font-medium tracking-[-0.5px] block",
            !areValuesVisible && "blur-sm",
          )}
        >
          {formatCurrency(data.currentBalance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  );
};
