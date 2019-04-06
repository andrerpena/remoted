import * as React from "react";
import { PropsWithChildren } from "react";

export interface CheckBoxFilterBoxProps {
  title: string;
}

export const CheckBoxFilterBox: React.FunctionComponent<
  PropsWithChildren<CheckBoxFilterBoxProps>
> = (props: PropsWithChildren<CheckBoxFilterBoxProps>) => {
  return (
    <div className="filter-box">
      <div className="filter-box-title">{props.title}</div>
      <div className="checkbox-list">{props.children}</div>
    </div>
  );
};
