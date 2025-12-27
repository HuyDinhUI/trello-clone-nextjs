import React from "react";

type LabelProps = {} & React.LabelHTMLAttributes<HTMLLabelElement>;

export const FieldLabel = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ ...rest }, ref) => {
    return (
      <label ref={ref} className="data-[invalid=true]:text-red-500" {...rest}></label>
    );
  }
);

FieldLabel.displayName = "FieldLabel";
