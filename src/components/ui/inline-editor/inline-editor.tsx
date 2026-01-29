import { ReactNode } from "react";
import { InlineEditorRoot } from "./inline-editor-root";

type InlineEditorProps = {
  children: ReactNode
  title: string;
  handle: () => void;
  classname?: string
};

const InlineEditor = ({ title, handle, children, classname }: InlineEditorProps) => {
  return (
    <InlineEditorRoot value={title} onSave={handle}>
      <InlineEditorRoot.View classname={classname}>
        {children}
      </InlineEditorRoot.View>

      <InlineEditorRoot.Edit>
        <InlineEditorRoot.Input autoFocus/>
        <InlineEditorRoot.Actions />
      </InlineEditorRoot.Edit>
    </InlineEditorRoot>
  );
};

export default InlineEditor
