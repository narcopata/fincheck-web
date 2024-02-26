import { Button } from "@components/Button";
import { DatePickerInput } from "@components/DatePickerInput";
import { Input } from "@components/Input";
import { InputCurrency } from "@components/InputCurrency";
import { Modal } from "@components/Modal";
import { Select } from "@components/Select";
import { TRANSACTION_TYPES } from "@constants/transactionTypes";
import { Controller } from "react-hook-form";
import { useNewTransactionModal } from "./useNewTransactionModal";

export const NewTransactionModal = () => {
  const { form, modals, bankAccountsData, categoriesData } =
    useNewTransactionModal();

  const isTypeIncome = modals.newTransaction.type === TRANSACTION_TYPES.INCOME;

  return (
    <Modal.Root open={modals.newTransaction.isOpen}>
      <Modal.Header
        title={isTypeIncome ? "Nova Receita" : "Nova Despesa"}
        onClose={modals.newTransaction.close}
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

          <Button type="submit" className="w-full mt-6">
            Salvar
          </Button>
        </div>
      </form>
    </Modal.Root>
  );
};
