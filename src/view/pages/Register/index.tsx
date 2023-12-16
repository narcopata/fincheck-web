import { FunctionComponent } from "preact";

import { Input } from "../../components/Input";

import { Button } from "../../components/Button";

export const Register: FunctionComponent = () => {
  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-center text-gray-900 text-2xl font-bold tracking-[-1px]">Crie sua conta</h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Já possui uma conta?</span>
          <a className="text-teal-900 font-medium tracking-[-0.5px]" href="/access/login">
            Fazer login
          </a>
        </p>
      </header>

      <form className="mt-[59px] flex flex-col gap-4" action="action">
        <Input name="name" placeholder="Nome" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <Button type="button" className="mt-2 bg-teal-900">
          Criar conta
        </Button>
      </form>
    </>
  );
};
