import { FunctionComponent } from "preact";

import s from './styles.module.css'

import { Route, Router } from "preact-iso";
import { Illustration as IllustrationImage } from "../../../assets";
import { Logo } from "../../components/Logo";

export type AuthLayoutProps = {
  routes: Parameters<typeof Route>[0][];
};

export const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ routes }) => {
  return (
    <div className={s.container}>
      <main className={s.main}>
        <Logo className="h-6 text-gray-500" />

        <div className={s["main-content-container"]}>
          <Router>
            {routes.map((routeProps) => (
              <Route {...routeProps} />
            ))}
          </Router>
        </div>
      </main>

      <aside className={s.aside}>
        <img
          alt="illustration"
          className={s.illustration}
          src={IllustrationImage}
        />

        <figure className={s.figure}>
          <Logo className={s["figure-logo"]} />
          <p className={s["figure-text"]}>
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </figure>
      </aside>
    </div>
  );
};
