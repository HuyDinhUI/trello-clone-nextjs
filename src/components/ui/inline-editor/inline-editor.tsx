import { ReactNode } from "react";
import { InlineEditorRoot } from "./inline-editor-root";

type InlineEditorProps = {
  children: ReactNode;
  title: string;
  handle: (v: string) => void;
  classname?: string;
  withStart?: boolean;
  actionButton?: boolean
};

const InlineEditor = ({
  title,
  handle,
  children,
  classname,
  withStart,
  actionButton = true
}: InlineEditorProps) => {
  return (
    <InlineEditorRoot withStart={withStart} value={title} onSave={handle}>
      <InlineEditorRoot.View classname={classname}>
        {children}
      </InlineEditorRoot.View>

      <InlineEditorRoot.Edit>
        <InlineEditorRoot.Input autoFocus />
        {actionButton && <InlineEditorRoot.Actions />}
      </InlineEditorRoot.Edit>
    </InlineEditorRoot>
  );
};

export default InlineEditor;
