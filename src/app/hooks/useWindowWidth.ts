import { useEffect, useState } from "preact/hooks";

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const setWidthOnResizeCb = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", setWidthOnResizeCb);

    return () => {
      window.removeEventListener("resize", setWidthOnResizeCb);
    };
  }, []);

  return width;
};
