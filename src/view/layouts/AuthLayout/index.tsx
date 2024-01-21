import type { FunctionComponent } from "preact";

import { Route, Router } from "preact-iso";
import { Illustration as IllustrationImage } from "../../../assets";
import { Logo } from "../../components/Logo";

export type AuthLayoutProps = {
  routes: Parameters<typeof Route>[0][];
};

export const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ routes }) => {
  return (
    <div className="flex w-full h-full">
      <main className="lg:w-1/2 w-full h-full flex items-center justify-center flex-col gap-16">
        <Logo className="h-6 text-gray-500" />

        <div className="w-full max-w-[504px] px-8">
          <Router>
            {routes.map((routeProps) => (
              <Route {...routeProps} />
            ))}
          </Router>
        </div>
      </main>

      <aside className="w-1/2 h-full justify-center items-center p-8 relative select-none hidden lg:flex">
        <img
          alt="illustration"
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] rounded-[32px]"
          src={IllustrationImage}
        />

        <figure className="flex flex-col mx-8 gap-[24px] max-w-[656px] bottom-8 bg-white p-10 absolute rounded-b-[32px]">
          <Logo className="text-teal-900 h-8 w-auto self-start" />
          <p className="text-gray-700 font-medium text-xl">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck,
            e o melhor, totalmente de graça!
          </p>
        </figure>
      </aside>
    </div>
  );
};
