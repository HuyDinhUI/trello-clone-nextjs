import { useEffect, useRef, useState } from "react";

type Timer = ReturnType<typeof setTimeout> | null;

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState<T>(value);
  const timerRef = useRef<Timer>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebounced(value);
      timerRef.current = null;
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [value, delay]);

  return debounced;
}
