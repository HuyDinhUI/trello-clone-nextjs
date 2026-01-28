"use client";

import { useEffect } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T> | React.MutableRefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const el = (ref as React.RefObject<T> | React.MutableRefObject<T | null>).current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}
