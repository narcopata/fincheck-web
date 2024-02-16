import { Button } from "@components/Button";
import { ColorDropdownInput } from "@components/ColorDropdownInput";
import { Input } from "@components/Input";
import { InputCurrency } from "@components/InputCurrency";
import { Modal } from "@components/Modal";
import { Select } from "@components/Select";
import { BANK_ACCOUNT_TYPES } from "@constants/bankAccountTypes";
import type { FunctionComponent } from "preact";
import { Controller } from "react-hook-form";
import { useEditAccountModal } from "./useEditAccountModal";

export const EditAccountModal: FunctionComponent = () => {
  const { modals, form } = useEditAccountModal();

  return (
    <Modal.Root open={modals.editAccount.isOpen}>
      <Modal.Header title="Editar Conta" onClose={modals.editAccount.close} />

      <form onSubmit={form.handleSubmit}>
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
