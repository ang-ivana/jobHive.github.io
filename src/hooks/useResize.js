import { useEffect, useState } from "react";
export function useResize() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let slides = 4;
  if (width <= 1024) slides = 3;
  if (width <= 768) slides = 2;
  if (width <= 548) slides = 1;

  return { width, slides };
}