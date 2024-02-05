import { useState } from "preact/hooks";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../../contexts/Dashboard/useDashboard";

export const useAccountsController = () => {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility, modals } = useDashboard();

  const [slider, setSlider] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    slider,
    setSlider,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    modals,
    isLoading: true,
    accounts: [],
  };
};
