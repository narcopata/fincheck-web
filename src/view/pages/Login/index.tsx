import { FunctionComponent } from "preact";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { AuthLayoutProps } from "../../layouts/AuthLayout";

import { useLoginController } from "./useLoginController";

type LoginProps = AuthLayoutProps;

export const Login: FunctionComponent<LoginProps> = () => {
  const { handleSubmit, register, errors, isPending } = useLoginController();

  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-center text-gray-900 text-2xl font-bold tracking-[-1px]">
          Entre em sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Novo por aqui?
          </span>
          <a
            className="text-teal-900 font-medium tracking-[-0.5px]"
            href="/access/register"
          >
            Crie uma conta
          </a>
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-[60px] flex flex-col gap-4">
        <Input
          errorMessage={errors?.email?.message}
          placeholder="E-mail"
          type="email"
          {...register("email")}
        />
        <Input
          errorMessage={errors?.password?.message}
          placeholder="Senha"
          type="password"
          {...register("password")}
        />

        <Button
          isPending={isPending}
          type="submit"
          className="mt-2 bg-teal-900"
        >
          Entrar
        </Button>
      </form>
    </>
  );
};
