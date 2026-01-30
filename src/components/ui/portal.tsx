"use client"

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Portal({ children }: { children: React.ReactNode }) {
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return createPortal(children, container);
}

export default Portal