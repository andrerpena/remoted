import * as React from "react";

export interface CheckboxProps {
  id: string;
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FunctionComponent<CheckboxProps> = (
  props: CheckboxProps
) => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={props.id}
        checked={props.checked}
        onChange={v => props.onChange(!props.checked)}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};
