import * as React from "react";

export const Script: React.FunctionComponent<React.PropsWithChildren<{}>> = ({
  children
}) => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(${children ? children.toString() : ""})();`
    }}
  />
);
