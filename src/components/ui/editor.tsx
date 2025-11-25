"use client";

import Quill from "quill";
import { useEffect } from "react";

type props = {
  show: boolean;
};

export default function Editor({ show }: props) {
  useEffect(() => {
    if (!show) return;

    const container = document.getElementById("editor");
    const quill = new Quill(container!, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],

          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["link", "image", "video"],
        ],
      },
    });

    return () => {
      // 🔥 cleanup để khi mount lại có thể init lại
      container!.innerHTML = "";
    };
  }, [show]);

  if (!show) return null;

  return <div id="editor" />;
}
