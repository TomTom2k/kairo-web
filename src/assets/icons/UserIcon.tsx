import React from "react";

import { Icon, IconProps } from "./Icon";

export const UserIcon: React.FC<Omit<IconProps, "children">> = props => {
  return (
    <Icon {...props}>
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </Icon>
  );
};
