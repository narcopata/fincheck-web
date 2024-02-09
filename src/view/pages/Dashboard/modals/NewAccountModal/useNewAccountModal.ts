import { message } from "@utils/message";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";

import { BANK_ACCOUNT_TYPES } from "@constants/bankAccountTypes";
import { superstructResolver } from "@hookform/resolvers/superstruct";
import { useCallback, useMemo } from "preact/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as ss from "superstruct";

const isStringNumber = () =>
  ss.refine(ss.string(), "isStringNumber", (value) => {
    if (value === "") {
      return "Saldo inicial é obrigatório";
    }

    const parsedValue = Number(value);

    return Number.isNaN(parsedValue) ? "Valor inválido" : true;
  });

const schema = ss.object({
  initialBalance: isStringNumber(),
  name: message(ss.nonempty(ss.string()), "O nome é um campo obrigatório"),
  type: message(ss.enums(Object.values(BANK_ACCOUNT_TYPES)), "Valor inválido"),
  color: message(ss.nonempty(ss.string()), "Cor é um campo obrigatório"),
});

type FormDataType = ss.Infer<typeof schema>;

export const useNewAccountModal = () => {
  const { modals } = useDashboard();

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormSubmit,
  } = useForm<FormDataType>({
    resolver: superstructResolver(schema),
  });

  const handleSubmit = useCallback(
    async (_data: unknown) => {
      try {
        await (() => {
          _data;
        });
      } catch (_error) {
        toast.error("");
      }
    },
    [hookFormSubmit],
  );

  const form = useMemo(
    () => ({
      register,
      errors,
      handleSubmit,
    }),
    [register, errors, handleSubmit],
  );

  return {
    modals,
    form,
  };
};
