"use client";
import { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import EditorjsList from "@editorjs/list";

type EditorProps = {
  data: any;
  onChange: (v: any) => void;
  editorBlock: string;
  readonly?: boolean;
};

const Editor = ({
  data,
  onChange,
  editorBlock,
  readonly = false,
}: EditorProps) => {
  const ref = useRef<any>(null);
  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorBlock,
        data: data,
        async onChange(api) {
          const saved = await api.saver.save();
          onChange(saved);
        },
        placeholder: "Let`s write a description! (tip: Press '/' for commands)",
        tools: {
          header: Header,
          List: {
            class: EditorjsList,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
        },
        readOnly: readonly,
        autofocus: true
      });
      ref.current = editor;
    }

    // return () => {
    //   if (ref.current && ref.current.destroy) {
    //     ref.current.destroy();
    //   }
    // };
  }, [editorBlock, data, onChange, readonly]);

  return <div className="dark:text-white" id={editorBlock}></div>;
};

export default memo(Editor);
