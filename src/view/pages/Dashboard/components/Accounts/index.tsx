import { Spinner } from "@components/Spinner";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { PlusIcon } from "@assets/icons/radix-icons";
import { cn } from "@utils/cn";

import { EyeIcon } from "../icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";

export const Accounts = () => {
  const {
    slider,
    setSlider,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    modals,
    isLoading,
    accounts,
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-10 h-10" />
        </div>
      )}
      {!isLoading && (
        <>
          <div>
            <span className="tracking-[-0.5px] text-white block">
              Saldo Total
            </span>
            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  "text-2xl tracking-[-1px] text-white",
                  !areValuesVisible && "blur-md",
                )}
              >
                R$ 1000.00
              </strong>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-end mt-10 md:mt-0">
            {accounts.length === 0 && (
              <div className="mb-4" slot="container-start">
                <strong className="text-white tracking-[-1px] text-lg font-bold">
                  Minhas contas
                </strong>

                <button
                  type="button"
                  className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white hover:bg-teal-950/5 transition-colors w-full"
                  onClick={modals.newAccount.open}
                >
                  <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="tracking-[-0.5px] font-medium block w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </div>
            )}

            {accounts.length && accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth >= 580 ? 2.2 : 1.2}
                  onSlideChange={({ isBeginning, isEnd }) => {
                    setSlider({
                      isBeginning,
                      isEnd,
                    });
                  }}
                >
                  <div
                    className="flex items-center justify-between mb-4"
                    slot="container-start"
                  >
                    <strong className="text-white tracking-[-1px] text-lg font-bold">
                      Minhas contas
                    </strong>
                    <SliderNavigation {...slider} />
                  </div>

                  <div>
                    {accounts.map((account) => (
                      <SwiperSlide>
                        <AccountCard
                          name={account.name}
                          balance={account.currentBalance}
                          color={account.color}
                          type={account.type}
                        />
                      </SwiperSlide>
                    ))}
                  </div>
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
