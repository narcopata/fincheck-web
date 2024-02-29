import { QUERY_KEYS } from "@config/queryKeys";
import { TRANSACTION_TYPES } from "@constants/transactionTypes";
import type { Transaction } from "@entities/Transaction";
import { superstructResolver } from "@hookform/resolvers/superstruct";
import { useBankAccount } from "@hooks/useBankAccount";
import { useCategories } from "@hooks/useCategories";
import { transactionService } from "@services/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "@utils/message";
import { useCallback, useMemo, useState } from "preact/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as ss from "superstruct";
import type { EditTransactionModalProps } from ".";

const isStringNumber = () =>
  ss.refine(ss.string(), "isStringNumber", (value) => {
    if (value === "") {
      return "Saldo inicial é obrigatório";
    }

    const parsedValue = Number(value);

    return Number.isNaN(parsedValue) ? "Valor inválido" : true;
  });

const schema = ss.object({
  value: message(ss.union([isStringNumber(), ss.number()]), "Informe o valor"),
  name: message(ss.nonempty(ss.string()), "Informe o nome"),
  categoryId: message(ss.nonempty(ss.string()), "Informe a categoria"),
  bankAccountId: message(ss.nonempty(ss.string()), "Informe a conta bancária"),
  date: ss.date(),
});

type FormDataType = ss.Infer<typeof schema>;

type Params = Pick<EditTransactionModalProps, "transaction" | "onClose">;

const useDeleteTransactionModal = (
  transaction: Transaction | null,
  onClose: () => void,
) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const deleteTransactionMutation = useMutation({
    mutationFn: transactionService.remove,
  });

  const queryClient = useQueryClient();

  const deleteTransaction = useCallback(async () => {
    if (!transaction?.id) {
      return;
    }

    try {
      await deleteTransactionMutation.mutateAsync(transaction.id);

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TRANSACTIONS.GET_ALL,
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANK_ACCOUNTS_ALL,
      });

      toast.success(
        transaction.type === TRANSACTION_TYPES.EXPENSE
          ? "A despesa foi removida com sucesso"
          : "A receita foi removida com sucesso",
      );

      close();
      onClose();
    } catch {
      toast.error(
        `Erro ao deletar a ${
          transaction.type === TRANSACTION_TYPES.EXPENSE ? "despesa" : "receita"
        }!`,
      );
    }
  }, [deleteTransactionMutation.mutateAsync, close, onClose]);

  const data = useMemo(
    () => ({
      isOpen,
      isPending: deleteTransactionMutation.isPending,
      open,
      close,
      delete: deleteTransaction,
    }),
    [
      isOpen,
      deleteTransactionMutation.isPending,
      open,
      close,
      deleteTransaction,
    ],
  );

  return data;
};

export const useEditTransactionModal = ({ transaction, onClose }: Params) => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit: hookFormHandleSubmit,
    reset,
  } = useForm<FormDataType>({
    resolver: superstructResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.category?.id,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction?.date ? new Date(transaction.date) : new Date(),
    },
  });

  const deleteTransactionModalData = useDeleteTransactionModal(
    transaction,
    onClose,
  );

  const updateAccountMutation = useMutation({
    mutationFn: transactionService.update,
    mutationKey: QUERY_KEYS.TRANSACTIONS.UPDATE,
  });

  const queryClient = useQueryClient();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    if (!transaction) {
      return;
    }

    try {
      await updateAccountMutation.mutateAsync({
        ...data,
        date: data.date.toISOString(),
        value: Number(data.value),
        type: transaction.type,
        id: transaction.id,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TRANSACTIONS.GET_ALL,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BANK_ACCOUNTS_ALL,
      });

      toast.success(
        transaction.type === "expense"
          ? "Despesa editada com sucesso!"
          : "Receita editada com sucesso!",
      );

      reset();

      onClose();
    } catch {
      toast.error(
        transaction.type === "expense"
          ? "Erro ao editar a despesa!"
          : "Erro ao editar a receita!",
      );
    }
  });

  const bankAccountsData = useBankAccount();

  const { categories, isPending } = useCategories();

  const categoriesData = useMemo(() => {
    return {
      categories: categories.filter(
        (category) => category.type === transaction?.type,
      ),
      isPending,
    };
  }, [categories, isPending, transaction]);

  const form = useMemo(
    () => ({
      control,
      errors,
      register,
      handleSubmit,
    }),
    [control, errors, register, handleSubmit],
  );

  return {
    form,
    handleSubmit,
    bankAccountsData,
    categoriesData,
    isPending: updateAccountMutation.isPending,
    deleteTransactionModalData,
  };
};
