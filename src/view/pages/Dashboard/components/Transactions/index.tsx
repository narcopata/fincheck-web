import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/constants/months";
import { ChevronDownIcon } from "../../../../../types/radix-icons";

import { FilterIcon } from "../icons/FilterIcon";
import { TransactionsIcon } from "../icons/TransactionsIcon";
import { SliderNavigation } from "./SliderNavigation";
import { SliderOption } from "./SliderOption";

export const Transactions = () => {
  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10">
      <header>
        <div>
          <button className="flex items-center gap-2" type="button">
            <TransactionsIcon />
            <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">Transações</span>
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

      <main className="mt-4" />
    </div>
  );
};
