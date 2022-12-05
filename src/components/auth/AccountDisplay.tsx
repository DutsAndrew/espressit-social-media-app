import React, { FC } from "react";
import { AccountDisplayProps } from "../../types/interfaces";

const AccountDisplay: FC<AccountDisplayProps> = (props): JSX.Element => {

  const { userStatus } = props;

  return (
    <p>Account Display</p>
  );
};

export default AccountDisplay;