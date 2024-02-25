import { PlusIcon } from "@assets/icons/radix-icons";
import { DropDownMenu } from "@components/DropdownMenu";
import { TRANSACTION_TYPES } from "@constants/transactionTypes";
import type { FunctionComponent } from "preact";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";
import { BankAccountIcon } from "../icons/BankAccountIcon";
import { CategoryIcon } from "../icons/categories/CategoryIcon";

export const Fab: FunctionComponent = () => {
  const { modals } = useDashboard();

  return (
    <div className="fixed right-4 bottom-4">
      <DropDownMenu.Root>
        <DropDownMenu.Trigger>
          <button
            className="w-12 h-12 text-white bg-teal-900 rounded-full flex items-center justify-center"
            type="button"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropDownMenu.Trigger>

        <DropDownMenu.Content>
          <DropDownMenu.Item
            onselect={() =>
              modals.newTransaction.open(TRANSACTION_TYPES.EXPENSE)
            }
            className="gap-2"
          >
            <CategoryIcon type={TRANSACTION_TYPES.EXPENSE} />
            Nova Despesa
          </DropDownMenu.Item>
          <DropDownMenu.Item
            onselect={() =>
              modals.newTransaction.open(TRANSACTION_TYPES.INCOME)
            }
            className="gap-2"
          >
            <CategoryIcon type={TRANSACTION_TYPES.INCOME} />
            Nova Receita
          </DropDownMenu.Item>
          <DropDownMenu.Item
            onselect={modals.newAccount.open}
            className="gap-2"
          >
            <BankAccountIcon />
            Nova Conta
          </DropDownMenu.Item>
        </DropDownMenu.Content>
      </DropDownMenu.Root>
    </div>
  );
};
