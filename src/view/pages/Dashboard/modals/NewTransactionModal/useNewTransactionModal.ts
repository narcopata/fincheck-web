import { QUERY_KEYS } from "@config/queryKeys";
import { superstructResolver } from "@hookform/resolvers/superstruct";
import { useBankAccount } from "@hooks/useBankAccount";
import { useCategories } from "@hooks/useCategories";
import { transactionService } from "@services/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "@utils/message";
import { useMemo } from "preact/hooks";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as ss from "superstruct";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";

const schema = ss.object({
  value: message(ss.nonempty(ss.string()), "Informe o valor"),
  name: message(ss.nonempty(ss.string()), "Informe o nome"),
  categoryId: message(ss.nonempty(ss.string()), "Informe a categoria"),
  bankAccountId: message(ss.nonempty(ss.string()), "Informe a conta bancária"),
  date: ss.date(),
});

type FormDataType = ss.Infer<typeof schema>;

export const useNewTransactionModal = () => {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit: hookFormHandleSubmit,
    reset,
  } = useForm<FormDataType>({
    resolver: superstructResolver(schema),
    defaultValues: {
      date: new Date(),
    },
  });

  const { modals } = useDashboard();

  const createAccountMutation = useMutation({
    mutationFn: transactionService.create,
    mutationKey: QUERY_KEYS.TRANSACTIONS.CREATE,
  });

  const queryClient = useQueryClient();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    if (!modals.newTransaction.type) {
      return;
    }

    try {
      await createAccountMutation.mutateAsync({
        ...data,
        date: data.date.toISOString(),
        value: Number(data.value),
        type: modals.newTransaction.type,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TRANSACTIONS.GET_ALL,
      });

      toast.success(
        modals.newTransaction.type === "expense"
          ? "Despesa cadastrada com sucesso!"
          : "Receita cadastrada com sucesso!",
      );

      modals.newTransaction.close();

      reset();
    } catch {
      toast.error(
        modals.newTransaction.type === "expense"
          ? "Erro ao cadastrar a despesa!"
          : "Erro ao cadastrar a receita!",
      );
    }
  });

  const bankAccountsData = useBankAccount();

  const { categories, isPending } = useCategories();

  const categoriesData = useMemo(() => {
    return {
      categories: categories.filter(
        (category) => category.type === modals.newTransaction.type,
      ),
      isPending,
    };
  }, [categories, isPending, modals.newTransaction.type]);

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
    modals,
    form,
    bankAccountsData,
    categoriesData,
    isPending: createAccountMutation.isPending,
  };
};
