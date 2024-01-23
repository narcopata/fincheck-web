import type { FunctionComponent } from "preact";

import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { useRegisterController } from "./useRegisterController";

export const Register: FunctionComponent = () => {
  const { errors, handleSubmit, register, isPending } = useRegisterController();

  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-center text-gray-900 text-2xl font-bold tracking-[-1px]">
          Crie sua conta
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Já possui uma conta?
          </span>
          <a
            className="text-teal-900 font-medium tracking-[-0.5px]"
            href="/access/login"
          >
            Fazer login
          </a>
        </p>
      </header>

      <form className="mt-[59px] flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Nome"
          {...register("name")}
          errorMessage={errors?.name?.message}
        />
        <Input
          type="email"
          placeholder="E-mail"
          {...register("email")}
          errorMessage={errors?.email?.message}
        />
        <Input
          type="password"
          placeholder="Senha"
          {...register("password")}
          errorMessage={errors?.password?.message}
        />

        <Button
          isPending={isPending}
          type="submit"
          className="mt-2 bg-teal-900"
        >
          Criar conta
        </Button>
      </form>
    </>
  );
};
