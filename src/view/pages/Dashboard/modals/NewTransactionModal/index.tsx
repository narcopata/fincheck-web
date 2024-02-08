import { Button } from "@components/Button";
import { DatePickerInput } from "@components/DatePickerInput";
import { Input } from "@components/Input";
import { InputCurrency } from "@components/InputCurrency";
import { Modal } from "@components/Modal";
import { Select } from "@components/Select";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";

export const NewTransactionModal = () => {
  const {
    modals: { newTransaction },
  } = useDashboard();

  const isTypeIncome = newTransaction.type === "income";

  return (
    <Modal.Root open={newTransaction.isOpen}>
      <Modal.Header
        title={isTypeIncome ? "Nova Receita" : "Nova Despesa"}
        onClose={newTransaction.close}
      />

      <form>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isTypeIncome ? "da receita" : "da despesa"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency />
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder={isTypeIncome ? "Nome da receita" : "Nome da despesa"}
          />

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

          <Select
            placeholder={isTypeIncome ? "Pagar com" : "Receber em"}
            options={[]}
          />

          <DatePickerInput />

          <Button>Criar</Button>
        </div>
      </form>
    </Modal.Root>
  );
};
