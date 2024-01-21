import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/constants/months";
import { ChevronDownIcon } from "../../../../../types/radix-icons";

import { useMemo } from "preact/hooks";
import { cn } from "../../../../../app/utils/cn";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { EmptyState } from "../../../../../assets";
import { Spinner } from "../../../../components/Spinner";
import { FilterIcon } from "../icons/FilterIcon";
import { TransactionsIcon } from "../icons/TransactionsIcon";
import { CategoryIcon } from "../icons/categories/CategoryIcon";
import { SliderNavigation } from "./SliderNavigation";
import { SliderOption } from "./SliderOption";
import { useTransactionsController } from "./useTransactionsController";

export const Transactions = () => {
  const { areValuesVisible, isFirstLoading, isNextLoading, transactions } =
    useTransactionsController();

  const hasTransactions = useMemo(
    () => transactions.length > 0,
    [transactions.length],
  );

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {isFirstLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950 fill-white w-10 h-10" />
        </div>
      )}

      {!isFirstLoading && (
        <>
          <header>
            <div>
              <button className="flex items-center gap-2" type="button">
                <TransactionsIcon />
                <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
                  Transações
                </span>
                <ChevronDownIcon className="text-gray-900" />
              </button>

              <button type="button">
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper slidesPerView={3} centeredSlides>
                <SliderNavigation />

                {Object.values(MONTHS).map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <main className="mt-4 space-y-2 flex-1">
            {(!hasTransactions && !isNextLoading) && (
              <div className="flex flex-col items-center justify-center h-full">
                {isNextLoading && <Spinner />}
                {!hasTransactions && (
                  <>
                    <img src={EmptyState} alt="empty state" />
                    <p className="text-gray-700">
                      Não encontramos nenhuma transação
                    </p>
                  </>
                )}
              </div>
            )}
            {hasTransactions && !isNextLoading && (
              <>
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center">
                    <CategoryIcon type="expense" />

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">04/06/2023</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "tracking-[-0.5px] font-medium",
                      !areValuesVisible && "blur-sm",
                    )}
                  >
                    - {formatCurrency(123)}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center">
                    <CategoryIcon type="income" />

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">
                        Almoço
                      </strong>
                      <span className="text-sm text-gray-600">04/06/2023</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "tracking-[-0.5px] font-medium",
                      !areValuesVisible && "blur-sm",
                    )}
                  >
                    {formatCurrency(123)}
                  </span>
                </div>
              </>
            )}
          </main>
        </>
      )}
      ;
    </div>
  );
};
