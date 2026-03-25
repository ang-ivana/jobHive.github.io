import { useState } from "react";
export function useSlider(total) {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const goTo = (i) => setIndex(i);

  return { index, next, prev, goTo };
}