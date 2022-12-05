import React, { FC } from "react";
import { SignInProps } from "../../types/interfaces";

const SignIn: FC<SignInProps> = (props): JSX.Element => {

  const { handleLogIn } = props;

  return (
    <p className="sign-in-link" onClick={handleLogIn} >Sign In</p>
  );
};

export default SignIn;