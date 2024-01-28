import { ChevronDownIcon } from "@assets/icons/radix-icons";
import { DropDownMenu } from "@components/DropdownMenu";
import type { FunctionComponent } from "preact";
import { ExpensesIcon } from "../icons/ExpensesIcon";
import { IncomeIcon } from "../icons/IncomeIcon";
import { TransactionsIcon } from "../icons/TransactionsIcon";

export const TransactionTypeDropdown: FunctionComponent = () => {
  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger asChild>
        <button className="flex items-center gap-2" type="button">
          <TransactionsIcon />
          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            Transações
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropDownMenu.Trigger>

      <DropDownMenu.Portal>
        <DropDownMenu.Content className="z-50 w-[280px]">
          <DropDownMenu.Item className="gap-2">
            <IncomeIcon />
            Receitas
          </DropDownMenu.Item>
          <DropDownMenu.Item className="gap-2">
            <ExpensesIcon /> Despesas
          </DropDownMenu.Item>
          <DropDownMenu.Item className="gap-2">
            <TransactionsIcon /> Transações
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu.Portal>
    </DropDownMenu.Root>
  );
};
