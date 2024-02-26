import { Swiper, SwiperSlide } from "swiper/react";

import { EmptyState } from "@assets";
import { Spinner } from "@components/Spinner";
import { MONTHS } from "@constants/months";
import { cn } from "@utils/cn";
import { formatCurrency } from "@utils/formatCurrency";
import { useEffect, useMemo } from "preact/hooks";

import { TRANSACTION_TYPES } from "@constants/transactionTypes";
import { formatDate } from "@utils/formatDate";
import { FilterIcon } from "../icons/FilterIcon";
import { CategoryIcon } from "../icons/categories/CategoryIcon";
import { FiltersModal } from "./FiltersModal";
import { SliderNavigation } from "./SliderNavigation";
import { SliderOption } from "./SliderOption";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { useTransactionsController } from "./useTransactionsController";

export const Transactions = () => {
  const {
    areValuesVisible,
    isFirstLoading,
    isNextLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filtersDispatch,
    filters,
    refetch: refetchTransactions,
  } = useTransactionsController();

  const hasTransactions = useMemo(
    () => transactions.length > 0,
    [transactions.length],
  );

  useEffect(() => {
    refetchTransactions();
  }, [refetchTransactions, filters]);

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      <FiltersModal
        open={isFiltersModalOpen}
        onClose={handleCloseFiltersModal}
        onApplyFilters={
          (filters) => filtersDispatch({
            set: {
              bankAccountId: filters.bankAccountId ?? undefined,
              year: filters.year ?? undefined,
            }
          })
        }
      />
      {isFirstLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950 fill-white w-10 h-10" />
        </div>
      )}
      {!isFirstLoading && (
        <>
          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={(type) => {
                  filtersDispatch({
                    set: {
                      type: type === "all" ? undefined : type,
                    },
                  });
                }}
                selectedType={filters.type || "all"}
              />

              <button onClick={handleOpenFiltersModal} type="button">
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                initialSlide={filters.month - 1}
                slidesPerView={3}
                centeredSlides
                onSlideChange={(swiper) => {
                  if (swiper.realIndex === filters.month) {
                    return;
                  }

                  filtersDispatch({
                    set: {
                      month: swiper.realIndex,
                    },
                  });
                }}
              >
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
            {!(hasTransactions || isNextLoading) && (
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
            {hasTransactions &&
              !isNextLoading &&
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                >
                  <div className="flex-1 flex items-center">
                    <CategoryIcon
                      type={transaction.type}
                      category={transaction.category?.icon}
                    />

                    <div>
                      <strong className="font-bold tracking-[-0.5px] block">
                        {transaction.name}
                      </strong>
                      <span className="text-sm text-gray-600">
                        {formatDate(new Date(transaction.date))}
                      </span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "tracking-[-0.5px] font-medium",
                      transaction.type === TRANSACTION_TYPES.EXPENSE
                        ? "text-red-800"
                        : "text-green-800",
                      !areValuesVisible && "blur-sm",
                    )}
                  >
                    {transaction.type === TRANSACTION_TYPES.EXPENSE ? "-" : "+"}{" "}
                    {formatCurrency(transaction.value)}
                  </span>
                </div>
              ))}
          </main>
        </>
      )}
    </div>
  );
};
