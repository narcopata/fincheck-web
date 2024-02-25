import { DropDownMenu } from "@components/DropdownMenu";

import { ChevronDownIcon } from "@assets/icons/radix-icons";
import {
  TRANSACTION_TYPES,
  type TransactionType,
} from "@constants/transactionTypes";
import type { FunctionComponent } from "preact";
import { ExpensesIcon } from "../icons/ExpensesIcon";
import { IncomeIcon } from "../icons/IncomeIcon";
import { TransactionsIcon } from "../icons/TransactionsIcon";

type Props = {
  onSelect: (type: TransactionType | "all") => void;
  selectedType: TransactionType | "all";
};

export const TransactionTypeDropdown: FunctionComponent<Props> = ({
  onSelect,
  selectedType,
}) => {
  return (
    <DropDownMenu.Root>
      <DropDownMenu.Trigger asChild>
        <button className="flex items-center gap-2" type="button">
          {selectedType === "all" && <TransactionsIcon />}
          {selectedType === TRANSACTION_TYPES.INCOME && <IncomeIcon />}
          {selectedType === TRANSACTION_TYPES.EXPENSE && <ExpensesIcon />}
          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {selectedType === "all" && "Transações"}
            {selectedType === TRANSACTION_TYPES.INCOME && "Receitas"}
            {selectedType === TRANSACTION_TYPES.EXPENSE && "Despesas"}
          </span>
          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropDownMenu.Trigger>

      <DropDownMenu.Content className="w-[280px]">
        <DropDownMenu.Item
          className="gap-2"
          onSelect={() => {
            onSelect(TRANSACTION_TYPES.INCOME);
          }}
        >
          <IncomeIcon />
          Receitas
        </DropDownMenu.Item>
        <DropDownMenu.Item
          className="gap-2"
          onSelect={() => {
            onSelect(TRANSACTION_TYPES.EXPENSE);
          }}
        >
          <ExpensesIcon /> Despesas
        </DropDownMenu.Item>
        <DropDownMenu.Item
          className="gap-2"
          onSelect={() => {
            onSelect("all");
          }}
        >
          <TransactionsIcon /> Transações
        </DropDownMenu.Item>
      </DropDownMenu.Content>
    </DropDownMenu.Root>
  );
};
