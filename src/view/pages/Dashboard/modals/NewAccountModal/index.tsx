import { ColorDropdownInput } from "@components/ColorDropdownInput";
import { Input } from "@components/Input";
import { InputCurrency } from "@components/InputCurrency";
import { Modal } from "@components/Modal";
import { Select } from "@components/Select";
import type { FunctionComponent } from "preact";
import { useNewAccountModal } from "./useNewAccountModal";

export const NewAccountModal: FunctionComponent = () => {
  const { modals } = useNewAccountModal();

  return (
    <Modal.Root open={modals.newAccount.isOpen}>
      <Modal.Header title="Nova Conta" onClose={modals.newAccount.close} />

      <form>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <form>
              <div>
                <span className="text-gray-600 tracking-[-0.5px] text-lg">
                  R$
                </span>
                <InputCurrency />
              </div>
            </form>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="initialBalance"
            placeholder="Nome da conta"
          />
        </div>

          <Select
            placeholder="Tipo"
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
          />

        <ColorDropdownInput />
      </form>
    </Modal.Root>
  );
};
