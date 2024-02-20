import { Button } from "@components/Button";
import { Modal } from "@components/Modal";
import type { FunctionComponent } from "preact";
import { TrashIcon } from "../../components/icons/TrashIcon";

type Props = {
  onClose(): void;
  onConfirm(): void;
  title: string;
  description?: string;
  isPending: boolean;
};

export const ConfirmDeleteModal: FunctionComponent<Props> = ({
  onClose,
  onConfirm,
  title,
  description,
  isPending,
}) => {
  return (
    <Modal.Root open={true}>
      <Modal.Header title="Excluir" onClose={onClose} />

      <div className="flex flex-col items-center text-center gap-6">
        <div className="rounded-full bg-red-0 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>

        <p className="w-[180px] text-gray-800 tracking-[-0.5px] font-bold">
          {title}
        </p>

        {description && (
          <p className="tracking-[-0.5px]  text-gray-800">{description}</p>
        )}
      </div>

      <div className="mt-10 space-y-4">
        <Button
          isPending={isPending}
          variant="danger"
          className="w-full"
          onClick={() => onConfirm()}
        >
          Sim, desejo excluir
        </Button>
        <Button
          disabled={isPending}
          variant="ghost"
          onClick={() => onClose()}
          className="w-full"
        >
          Cancelar
        </Button>
      </div>
    </Modal.Root>
  );
};
