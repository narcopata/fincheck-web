import { ChevronLeftIcon, ChevronRightIcon } from "@assets/icons/radix-icons";
import type { FunctionComponent } from "preact";
import { useSwiper } from "swiper/react";

type Props = {
  isBeginning: boolean;
  isEnd: boolean;
};

export const SliderNavigation: FunctionComponent<Props> = ({
  isBeginning,
  isEnd,
}) => {
  const swipe = useSwiper();

  return (
    <div>
      <button
        type="button"
        className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swipe.slidePrev()}
        disabled={isBeginning}
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>
      <button
        type="button"
        className="py-3 pl-3.5 pr-2.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swipe.slideNext()}
        disabled={isEnd}
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  );
};
