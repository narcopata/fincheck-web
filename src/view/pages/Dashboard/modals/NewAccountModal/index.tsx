import { Button } from "@components/Button";
import { ColorDropdownInput } from "@components/ColorDropdownInput";
import { Input } from "@components/Input";
import { InputCurrency } from "@components/InputCurrency";
import { Modal } from "@components/Modal";
import { Select } from "@components/Select";
import type { FunctionComponent } from "preact";
import { useNewAccountModal } from "./useNewAccountModal";

export const NewAccountModal: FunctionComponent = () => {
  const { modals, form } = useNewAccountModal();

  return (
    <Modal.Root open={modals.newAccount.isOpen}>
      <Modal.Header title="Nova Conta" onClose={modals.newAccount.close} />

      <form onSubmit={form.handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency
              errorMessage={form.errors.initialBalance?.message}
              {...form.register("initialBalance")}
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Nome da conta"
            errorMessage={form.errors.name?.message}
            {...form.register("name")}
          />

          <Select
            placeholder="Tipo"
            errorMessage={form.errors.type.message}
            options={[
              {
                value: "CHECKING",
                label: "Conta Corrente",
              },
              {
                value: "INVESTMENT",
                label: "Investimentos",
              },
              {
                value: "CASH",
                label: "Dinheiro Físico",
              },
            ]}
            {...form.register("type")}
          />

          <ColorDropdownInput
            errorMessage={form.errors.color?.message}
            {...form.register("color")}
          />

          <Button className="w-full mt-6" isPending={form.isPending}>
            Criar
          </Button>
        </div>
      </form>
    </Modal.Root>
  );
};
