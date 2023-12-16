import { FunctionComponent } from "preact";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { AuthLayoutProps } from "../../layouts/AuthLayout";
import styles from "./styles.module.css";

type LoginProps = AuthLayoutProps;

export const Login: FunctionComponent<LoginProps> = () => {
  return (
    <>
      <header className="flex flex-col items-center gap-4">
        <h1 className="text-center text-gray-900 text-2xl font-bold tracking-[-1px]">Entre em sua conta</h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">Novo por aqui?</span>
          <a className="text-teal-900 font-medium tracking-[-0.5px]" href="/access/register">
            Crie uma conta
          </a>
        </p>
      </header>

      <form className="mt-[60px] flex flex-col gap-4;" action="action">
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <Button type="submit" className="mt-2 bg-teal-900">
          Entrar
        </Button>
      </form>
    </>
  );
};
