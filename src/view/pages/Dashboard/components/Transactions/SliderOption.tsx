import { monthsAbbreviatedPtBr } from "@constants/months";
import { cn } from "@utils/cn";
import type { FunctionComponent } from "preact";
import { useSwiper } from "swiper/react";

type Props = {
  isActive: boolean;
  month: string;
  index: number;
};

export const SliderOption: FunctionComponent<Props> = ({
  isActive,
  month,
  index,
}) => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideTo(index)}
      type="button"
      className={cn("text-sm text-gray-800 tracking-[-0.5px] font-medium", {
        "bg-white": isActive,
      })}
    >
      {monthsAbbreviatedPtBr[month]}
    </button>
  );
};
