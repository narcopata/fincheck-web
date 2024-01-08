import { useForm } from "react-hook-form";

import isEmail from "is-email";

import { superstructResolver } from "@hookform/resolvers/superstruct";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as s from "superstruct";
import { authService } from "../../../app/services/auth";
import { SignupParams } from "../../../app/services/auth/signup";
import { message } from "../../../app/utils/message";

const email = () =>
  s.refine(
    message(s.nonempty(s.string()), "E-mail é um campo obrigatório"),
    "email",
    (value) => isEmail(value) || "Informe um e-mail válido",
  );

const password = () =>
  message(
    s.nonempty(
      message(
        s.size(s.string(), 8, 24),
        "A senha deve conter no mínimo 8 caracteres",
      ),
    ),
    "Senha é um campo obrigatório",
  );

const schema = s.object({
  email: email(),
  password: password(),
  name: message(s.nonempty(s.string()), "Nome é um campo obrigatório"),
});

type FormDataType = s.Infer<typeof schema>;

export const useRegisterController = () => {
  const {
    register,
    formState: { errors },
    handleSubmit: formHandleSubmit,
  } = useForm<FormDataType>({
    mode: "all",
    resolver: superstructResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return await authService.signup(data);
    },
  });

  const handleSubmit = formHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);
    } catch {
      toast.error("Ocorreu um erro ao criar sua conta");
    }
  });

  return {
    errors,
    handleSubmit,
    register,
    isPending,
  };
};
