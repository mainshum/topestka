import { useState } from "react";

export const useCounter = (initialValue: number = 0, min: number = 0, max: number = 100) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount((prev) => prev < max ? prev + 1 : prev);
  };

  const decrement = () => {
    setCount((prev) => prev > min ? prev - 1 : prev);
  };

  return { count, increment, decrement };
};