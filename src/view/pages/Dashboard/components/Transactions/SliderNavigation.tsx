import { useSwiper } from "swiper/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../../../../types/radix-icons";

export const SliderNavigation = () => {
  const _swiper = useSwiper();

  return (
    <>
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-100 z-10 flex items-center justify-center bg-gradient-to-r from-gray-100 to-transparent"
        type="button"
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex bg-gray-100 z-10 items-center justify-center bg-gradient-to-l from-gray-100 to-transparent"
        type="button"
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-800" />
      </button>
    </>
  );
};
