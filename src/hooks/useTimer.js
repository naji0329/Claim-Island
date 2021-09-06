import { useEffect, useState } from "react";
export const useTimer = (calcTimeFn) => {
  const [timeLeft, setTimeLeft] = useState(calcTimeFn());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calcTimeFn());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return { timeLeft };
};
