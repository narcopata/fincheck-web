import { FunctionComponent } from "preact";
import { useSwiper } from "swiper/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../../../types/radix-icons";

export const AccountSliderNavigation: FunctionComponent = () => {
  const swipe = useSwiper();

  return (
    <div>
      <button
        type="button"
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swipe.slidePrev()}
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>
      <button
        type="button"
        className="py-3 pl-3.5 pr-2.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swipe.slideNext()}
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  );
};
