import { ChevronLeftIcon, ChevronRightIcon } from "@assets/icons/radix-icons";
import { Button } from "@components/Button";
import {
  Modal,
  type ModalHeaderProps,
  type ModalRootProps,
} from "@components/Modal";
import { cn } from "@utils/cn";
import type { FunctionComponent } from "preact";
import { useFiltersModal } from "./useFiltersModalController";

type Props = Omit<ModalRootProps & ModalHeaderProps, "title"> & {
  onApplyFilters: (filters: {
    bankAccountId: string | null;
    year: number | null;
  }) => void;
};

export const FiltersModal: FunctionComponent<Props> = ({
  open,
  onClose,
  onApplyFilters,
}) => {
  const { filtersData, dispatchFilters, accounts } = useFiltersModal();

  return (
    <Modal.Root open={open}>
      <Modal.Header onClose={onClose} title="Filtros" />
      <div>
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Conta
        </span>

        <div className="space-y-2 mt-2">
          {accounts.map((account) => (
            <button
              key={account.id}
              type="button"
              onClick={() =>
                dispatchFilters({ set: { bankAccountId: account.id } })
              }
              className={cn(
                "p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors",
                account.id === ("100" || filtersData.bankAccountId) &&
                  "!bg-gray-200",
              )}
            >
              {account.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg tracking-[-1px] font-bold text-gray-800">
          Ano
        </span>

        <div className="mt-2 w-52 flex items-center justify-between">
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center"
            onClick={() =>
              dispatchFilters({
                set: {
                  year: {
                    type: "decrement",
                  },
                },
              })
            }
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex-1 text-center">
            <span className="text-sm font-medium tracking-[-0.5px]">
              {filtersData.year}
            </span>
          </div>

          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center"
            onClick={() =>
              dispatchFilters({
                set: {
                  year: {
                    type: "increment",
                  },
                },
              })
            }
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Button
        className="w-full mt-10"
        onClick={() =>
          onApplyFilters({
            ...filtersData,
          })
        }
      >
        Aplicar Filtros
      </Button>
    </Modal.Root>
  );
};
