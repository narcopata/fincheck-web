import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { EyeIcon } from "../icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";

export const Accounts = () => {
  const { slider, setSlider, windowWidth } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      <div>
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
              <SwiperSlide>
                <AccountCard
                  name="Nubank"
                  balance={1000}
                  color="#612F74"
                  type="CASH"
                />
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
