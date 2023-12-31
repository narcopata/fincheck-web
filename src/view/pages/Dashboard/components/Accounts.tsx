import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { AccountCard } from "./AccountCard";
import { AccountSliderNavigation } from "./AccountSliderNavigation";
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
        <div>
          <Swiper spaceBetween={16} slidesPerView={2.2}>
            <div
              className="flex items-center justify-between mb-4"
              slot="container-start"
            >
              <strong className="text-white tracking-[-1px] text-lg font-bold">
                Minhas contas
              </strong>
              <AccountSliderNavigation />
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
