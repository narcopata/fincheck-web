import { message } from "@utils/message";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";

import { QUERY_KEYS } from "@config/queryKeys";
import { BANK_ACCOUNT_TYPES } from "@constants/bankAccountTypes";
import { COLORS, type ColorKey } from "@constants/colors";
import { superstructResolver } from "@hookform/resolvers/superstruct";
import { bankAccountService } from "@services/bankAccounts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { currencyStringToNumber } from "@utils/currencyStringToNumber";
import { useCallback, useMemo, useState } from "preact/hooks";
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

const useConfirmDeleteModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const data = useMemo(
    () => ({
      isOpen,
      open,
      close,
    }),
    [isOpen, open, close],
  );

  return data;
};

export const useEditAccountModal = () => {
  const { modals } = useDashboard();

  /*   const {
    editAccount: { account },
  } = modals; */

  const confirmDeleteModalData = useConfirmDeleteModal();

  const modalsData = useMemo(
    () => ({
      ...modals,
      confirmDelete: confirmDeleteModalData,
    }),
    [modals, confirmDeleteModalData],
  );

  const {
    editAccount: { account },
  } = modalsData;

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormSubmit,
    control,
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

  const updateBankAccountMutation = useMutation({
    mutationFn: bankAccountService.edit,
  });

  const deleteBanAccountMutation = useMutation({
    mutationFn: bankAccountService.delete,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if (!(data.color && account?.id)) {
        return;
      }

      await updateBankAccountMutation.mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        color: COLORS[data.color].color,
        id: account.id,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANK_ACCOUNTS_ALL,
      });

      toast.success("Conta foi editada com sucesso.");

      modals.editAccount.close();
    } catch {
      toast.error("Erro ao salvar as alterações.");
    }
  });

  const handleDeleteAccount = useCallback(async () => {
    try {
      if (!account?.id) {
        return;
      }

      await deleteBanAccountMutation.mutateAsync(account?.id);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANK_ACCOUNTS_ALL,
      });

      toast.success("A conta foi excluída com sucesso.");

      modals.editAccount.close();
    } catch {
      toast.error("Erro ao excluir conta.");
    }
  }, [deleteBanAccountMutation, modals.editAccount.close, queryClient]);

  const form = useMemo(
    () => ({
      register,
      errors,
      handleSubmit: {
        edit: handleSubmit,
        delete: handleDeleteAccount,
      },
      isPending: updateBankAccountMutation.isPending,
      isDeletePending: deleteBanAccountMutation.isPending,
      control,
    }),
    [
      register,
      errors,
      handleSubmit,
      handleDeleteAccount,
      control,
      updateBankAccountMutation.isPending,
      deleteBanAccountMutation.isPending,
    ],
  );

  return {
    modals: modalsData,
    form,
  };
};
