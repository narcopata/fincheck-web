import { superstructResolver } from "@hookform/resolvers/superstruct";
import { useForm } from "react-hook-form";

import isEmail from "is-email";

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
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormDataType>({
    mode: "all",
    resolver: superstructResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    const responseData = await authService.signin(data);

    console.table(responseData);
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};
