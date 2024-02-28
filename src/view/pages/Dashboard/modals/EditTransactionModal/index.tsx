import { Button } from "@components/Button";
import { DatePickerInput } from "@components/DatePickerInput";
import { Input } from "@components/Input";
import { InputCurrency } from "@components/InputCurrency";
import { Modal } from "@components/Modal";
import { Select } from "@components/Select";
import { TRANSACTION_TYPES } from "@constants/transactionTypes";
import type { Transaction } from "@entities/Transaction";
import type { FunctionComponent } from "preact";
import { Controller } from "react-hook-form";
import { useEditTransactionModal } from "./useEditTransactionModal";

type Props = {
  isOpen: boolean;
  onClose(): void;
  transaction: Transaction | null;
};

export const EditTransactionModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  const { form, categoriesData, bankAccountsData, isPending } =
    useEditTransactionModal({ transaction, onClose });

  const isTypeIncome = transaction?.type === TRANSACTION_TYPES.INCOME;

  return (
    <Modal.Root open={isOpen}>
      <Modal.Header
        title={isTypeIncome ? "Editar Receita" : "Editar Despesa"}
        onClose={onClose}
      />

      <form onSubmit={form.handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isTypeIncome ? "da receita" : "da despesa"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={form.control}
              name="value"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  errorMessage={form.errors.value?.message}
                  value={value}
                  onInput={onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isTypeIncome ? "Nome da receita" : "Nome da despesa"}
            errorMessage={form.errors.name?.message}
            {...form.register("name")}
          />

          <Controller
            control={form.control}
            name="categoryId"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                onInput={onChange}
                value={value}
                errorMessage={form.errors.categoryId?.message}
                options={categoriesData.categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
              />
            )}
          />

          <Controller
            name="bankAccountId"
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isTypeIncome ? "Receber em" : "Pagar com"}
                onInput={onChange}
                value={value}
                errorMessage={form.errors.bankAccountId?.message}
                options={bankAccountsData.accounts.map(({ id, name }) => ({
                  label: name,
                  value: id,
                }))}
              />
            )}
          />

          <Controller
            control={form.control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                errorMessage={form.errors.date?.message}
                onInput={onChange}
                value={value}
              />
            )}
          />

          <Button type="submit" className="w-full mt-6" isPending={isPending}>
            Salvar
          </Button>
        </div>
      </form>
    </Modal.Root>
  );
};

export type { Props as EditTransactionModalProps };
