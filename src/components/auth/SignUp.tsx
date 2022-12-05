import React, { FC } from "react";
import { SignUpProps } from "../../types/interfaces";

const SignUp: FC<SignUpProps> = (props): JSX.Element => {

  const { handleSignUp } = props;

  return (
    <p className="sign-up-link" onClick={handleSignUp} >Sign Up</p>
  );
};

export default SignUp;