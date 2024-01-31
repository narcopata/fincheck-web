import { Input } from "@components/Input";
import { InputCurrency } from "@components/InputCurrency";
import { Modal } from "@components/Modal";
import type { FunctionComponent } from "preact";
import { useNewAccountModal } from "./useNewAccountModal";

// type Props = ModalRootProps;

export const NewAccountModal: FunctionComponent = () => {
  const { closeAccountModalOpen, isNewAccountModalOpen } = useNewAccountModal();

  return (
    <Modal.Root open={isNewAccountModalOpen}>
      <Modal.Header title="Nova Conta" onClose={closeAccountModalOpen} />

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
        <div className="mt-10">
          <Input
            type="text"
            name="initialBalance"
            placeholder="Nome da conta"
          />
        </div>
      </form>
    </Modal.Root>
  );
};
