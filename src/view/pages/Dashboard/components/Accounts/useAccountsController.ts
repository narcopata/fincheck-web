import { useState } from "preact/hooks";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";

export const useAccountsController = () => {
  const windowWidth = useWindowWidth();

  const [slider, setSlider] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    slider,
    setSlider,
    windowWidth,
  };
};
