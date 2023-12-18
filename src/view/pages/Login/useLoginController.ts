import { superstructResolver } from "@hookform/resolvers/superstruct";
import { useForm } from "react-hook-form";

import isEmail from "is-email";

import * as s from "superstruct";
import { message } from "../../../app/utils/message";

const email = () =>
  s.refine(
    message(s.nonempty(s.string()), "E-mail é um campo obrigatório"),
    "email",
    (value) => isEmail(value) || "Informe um e-mail inválido",
  );

const password = () =>
  message(
    s.nonempty(
      message(
        s.size(s.string(), 8),
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

  const handleSubmit = hookFormHandleSubmit((data) => {
    console.log(data);
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};
