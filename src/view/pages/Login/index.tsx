import { FunctionComponent } from "preact";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { AuthLayoutProps } from "../../layouts/AuthLayout";
import styles from "./styles.module.css";

type LoginProps = AuthLayoutProps;

export const Login: FunctionComponent<LoginProps> = () => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles["header-title"]}>Entre em sua conta</h1>

        <p className="space-x-2">
          <span className={styles["header-text"]}>Novo por aqui?</span>
          <a className={styles["header-link"]} href="/access/register">
            Crie uma conta
          </a>
        </p>
      </header>

      <form className={styles.form} action="action">
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <Button type="submit" className="mt-2 bg-teal-900">
          Entrar
        </Button>
      </form>
    </>
  );
};
