import { ChevronLeftIcon, ChevronRightIcon } from "radix-icons";
import { AccountCard } from "./AccountCard";
import { EyeIcon } from "./icons/EyeIcon";

export const Accounts = () => {
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      <div>
        <span className="tracking-[-0.5px] text-white block">Saldo Total</span>

        <div className="flex items-center gap-2">
          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 1000.00
          </strong>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center"
          >
            <EyeIcon open />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end">
        <div className="flex items-center justify-between">
          <strong className="text-white tracking-[-1px] text-lg font-bold">
            Minhas contas
          </strong>

          <div>
            <button
              type="button"
              className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
            >
              <ChevronLeftIcon className="text-white w-6 h-6" />
            </button>
            <button
              type="button"
              className="py-3 pl-3.5 pr-2.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
            >
              <ChevronRightIcon className="text-white w-6 h-6" />
            </button>
          </div>
        </div>
        <div>
          <AccountCard name="Nubank" balance={1000} color="#323232" />
        </div>
      </div>
    </div>
  );
};
