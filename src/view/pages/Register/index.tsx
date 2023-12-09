import { FunctionComponent } from "preact";

import { Input } from "../../components/Input";

import { Button } from "../../components/Button";
import styles from "./styles.module.css";

export const Register: FunctionComponent = () => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles["header-title"]}>Crie sua conta</h1>

        <p className="space-x-2">
          <span className={styles["header-text"]}>Já possui uma conta?</span>
          <a className={styles["header-link"]} href="/access/login">
            Fazer login
          </a>
        </p>
      </header>

      <form className={styles.form} action="action">
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
