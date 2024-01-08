import { FunctionComponent } from "preact";
import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "./icons/BankAccountTypeIcon";
import { iconsMap as bankAccountTypesIconsMap } from "./icons/BankAccountTypeIcon/iconsMap";

type Props = {
  color: string;
  name: string;
  balance: number;
  type: keyof typeof bankAccountTypesIconsMap;
};

export const AccountCard: FunctionComponent<Props> = ({
  balance,
  color,
  name,
  type,
}) => {
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
        <span className="text-gray-800 font-medium tracking-[-0.5px] block">
          R$ {formatCurrency(balance)}
        </span>
        <small className="text-gray-600 text-sm">Saldo atual</small>
      </div>
    </div>
  );
};
