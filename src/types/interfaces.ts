import { MouseEventHandler } from 'react';
import { User } from "firebase/auth";

interface HeaderProps {
  handleSignUp: MouseEventHandler<HTMLParagraphElement>,
  handleLogIn: MouseEventHandler<HTMLParagraphElement>,
  currentUser: any,
};

interface SignUpProps {
  handleSignUp: MouseEventHandler<HTMLParagraphElement>,
};

interface SignInProps {
  handleLogIn: MouseEventHandler<HTMLParagraphElement>,
};

interface CreateAccountProps {
  createAccountWithEmailAndPassword: (email: string, password: string) => Promise<void>,
  handleSignUp: MouseEventHandler<HTMLParagraphElement>,
};

interface userState {
  formCompleted: boolean,
  currentUser: any,
  errorStatus: string | object,
};

interface LogInProps {
  signInUser: (email: string, password: string) => Promise<void>,
  handleLogIn: MouseEventHandler<HTMLButtonElement>,
  signInWithGoogleAccount: () => Promise<void>,
};

interface AccountDisplayProps {
  currentUser: any,
};

export {
  type HeaderProps,
  type SignUpProps,
  type SignInProps,
  type CreateAccountProps,
  type userState,
  type LogInProps,
  type AccountDisplayProps,
};