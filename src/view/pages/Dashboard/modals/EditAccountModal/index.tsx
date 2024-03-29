import { Button } from "@components/Button";
import { ColorDropdownInput } from "@components/ColorDropdownInput";
import { Input } from "@components/Input";
import { InputCurrency } from "@components/InputCurrency";
import { Modal } from "@components/Modal";
import { Select } from "@components/Select";
import { BANK_ACCOUNT_TYPES } from "@constants/bankAccountTypes";
import type { FunctionComponent } from "preact";
import { Controller } from "react-hook-form";
import { TrashIcon } from "../../components/icons/TrashIcon";
import { ConfirmDeleteModal } from "../ConfirmDeleteModal";
import { useEditAccountModal } from "./useEditAccountModal";

export const EditAccountModal: FunctionComponent = () => {
  const { modals, form } = useEditAccountModal();

  if (modals.confirmDelete.isOpen) {
    return (
      <ConfirmDeleteModal
        title="Tem certeza que deseja excluir esta conta?"
        onConfirm={form.handleSubmit.delete}
        onClose={modals.confirmDelete.close}
        description="Ao excluir a conta, também serão excluídos todos os registros da
      receita e despesas relacionados."
        isPending={form.isDeletePending}
      />
    );
  }

  return (
    <Modal.Root open={modals.editAccount.isOpen}>
      <Modal.Header
        rightAction={
          <button onClick={modals.confirmDelete.open} type="button">
            <TrashIcon className="w-6 h-6 text-red-900" />
          </button>
        }
        title="Editar Conta"
        onClose={modals.editAccount.close}
      />

      <form onSubmit={form.handleSubmit.edit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              name="initialBalance"
              control={form.control}
              defaultValue={0}
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  errorMessage={form.errors.initialBalance?.message}
                  onInput={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da conta"
            defaultValue=""
            errorMessage={form.errors.name?.message}
            {...form.register("name")}
          />

          <Controller
            control={form.control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                onInput={onChange}
                value={value}
                errorMessage={form.errors.type?.message}
                options={[
                  {
                    value: BANK_ACCOUNT_TYPES.CHECKING,
                    label: "Conta Corrente",
                  },
                  {
                    value: BANK_ACCOUNT_TYPES.INVESTMENT,
                    label: "Investimentos",
                  },
                  {
                    value: BANK_ACCOUNT_TYPES.CASH,
                    label: "Dinheiro Físico",
                  },
                ]}
              />
            )}
          />

          <Controller
            control={form.control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorDropdownInput
                value={value}
                onInput={onChange}
                errorMessage={form.errors.color?.message}
              />
            )}
          />

          <Button
            type="submit"
            className="w-full mt-6"
            isPending={form.isPending}
          >
            Salvar
          </Button>
        </div>
      </form>
    </Modal.Root>
  );
};
