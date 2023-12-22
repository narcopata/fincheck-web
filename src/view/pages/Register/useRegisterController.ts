import { useForm } from "react-hook-form";

import isEmail from "is-email";

import { superstructResolver } from "@hookform/resolvers/superstruct";
import * as s from "superstruct";
import { message } from "../../../app/utils/message";
import { authService } from "../../../app/services/auth";

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
        "A senha deve conter pelo menos 8 dígitos",
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

  const handleSubmit = formHandleSubmit(async (data) => {
    const responseData = await authService.signup(data);

    console.table(responseData);
  });

  return {
    errors,
    handleSubmit,
    register,
  };
};
