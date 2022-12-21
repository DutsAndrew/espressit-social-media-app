import React, { FC } from "react";
import { LogInProps } from '../../types/interfaces';
import google from '../../assets/google-logo.svg';

const LogIn: FC<LogInProps> = (props): JSX.Element => {

  const { signInUser, handleLogIn, signInWithGoogleAccount } = props;

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailEntry: any = document.querySelector('#email-login');
    const passwordEntry: any = document.querySelector('#password-login');
    if (emailEntry && passwordEntry) {
      if (emailEntry.validity.valid && passwordEntry.validity.valid) {
        signInUser(emailEntry.value, passwordEntry.value);
      };
    };
  };

  const handleGoogleSignIn = (): void => {
    signInWithGoogleAccount();
  };

  return (
    <form id="sign-in-form" onSubmit={handleSignIn} >
      <button type="button"
        id="close-form-button"
        onClick={handleLogIn}>
        X Close Form
      </button>
      <fieldset id="sign-in-fieldset" >
        <legend>Sign In:</legend>
        <label htmlFor="email-login" >
          *Email:
        </label>
        <input id="email-login"
          placeholder="JohnWick92@gmail.com"
          minLength={9}
          maxLength={253}
          type="email"
          required>
        </input>
        <label htmlFor="password-login" >
          *Password:
        </label>
        <input id="password-login"
          placeholder="********"
          minLength={8}
          maxLength={127}
          type="password"
          required>
        </input>
        <button id="sign-in-button"
          type="submit" >
          Sign In
        </button>
      </fieldset>
      <button type="button"
        id="google-sign-in-button"
        onClick={handleGoogleSignIn} >
        Sign in with 
        <img src={google}
          alt="google logo">
        </img>
      </button>
    </form>
  );
};

export default LogIn;