import { message } from "@utils/message";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";

import { QUERY_KEYS } from "@config/queryKeys";
import { BANK_ACCOUNT_TYPES } from "@constants/bankAccountTypes";
import { COLORS, type ColorKey } from "@constants/colors";
import { superstructResolver } from "@hookform/resolvers/superstruct";
import { bankAccountService } from "@services/bankAccounts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { currencyStringToNumber } from "@utils/currencyStringToNumber";
import { useMemo } from "preact/hooks";
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
  initialBalance: ss.union([isStringNumber(), ss.number()]),
  name: message(ss.nonempty(ss.string()), "O nome é um campo obrigatório"),
  type: message(ss.enums(Object.values(BANK_ACCOUNT_TYPES)), "Valor inválido"),
  color: message(
    ss.nonempty(
      ss.enums([...(Object.keys(COLORS) as unknown as ColorKey[]), ""]),
    ),
    "Cor é um campo obrigatório",
  ),
});

type FormDataType = ss.Infer<typeof schema>;

export const useEditAccountModal = () => {
  const { modals } = useDashboard();

  const {
    editAccount: { account },
  } = modals;

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    control,
    reset,
  } = useForm<FormDataType>({
    resolver: superstructResolver(schema),
    defaultValues: {
      name: account?.name,
      color: account?.color,
      type: account?.type,
      initialBalance: account?.initialBalance,
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: bankAccountService.edit,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if (!data.color) {
        return;
      }

      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        color: COLORS[data.color].color,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANK_ACCOUNTS_EDIT,
      });

      toast.success("Conta foi cadastrada com sucesso");

      modals.editAccount.close();

      reset();
    } catch {
      toast.error("Erro ao cadastrar a conta.");
    }
  });

  const form = useMemo(
    () => ({
      register,
      errors,
      handleSubmit,
      isPending,
      control,
    }),
    [register, errors, handleSubmit, control, isPending],
  );

  return {
    modals,
    form,
  };
};
