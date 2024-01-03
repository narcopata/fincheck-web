import { Logo } from "../../components/Logo";
import { UserMenu } from "../../components/UserMenu";

export const Dashboard = () => {
  return (
    <div className="bg-red-500 h-full w-full px-8 pb-8 pt-6 flex flex-col gap-4">
      <header className="h-12 items-center justify-between">
        <Logo className="h-6 text-teal-900" />
        <UserMenu />
      </header>
      <main className="flex-1">
        Content
      </main>
    </div>
  );
};
