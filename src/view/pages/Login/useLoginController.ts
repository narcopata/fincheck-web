import { superstructResolver } from "@hookform/resolvers/superstruct";
import { useForm } from "react-hook-form";

import isEmail from "is-email";

import * as s from "superstruct";
import { message } from "../../../app/utils/message";
import { authService } from "../../../app/services/auth";
import { useMutation } from "@tanstack/react-query";
import { SignInParams } from "../../../app/services/auth/signin";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../app/contexts/AuthContext";

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
});

type FormDataType = s.Infer<typeof schema>;

export const useLoginController = () => {
  const { signin } = useAuthContext();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormDataType>({
    mode: "all",
    resolver: superstructResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignInParams) => {
      return await authService.signin(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);
    } catch {
      toast.error("Credenciais inválidas!");
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isPending,
  };
};
