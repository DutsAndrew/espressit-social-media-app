import { MouseEventHandler, FormEventHandler } from 'react';
import { User } from "firebase/auth";

interface HeaderProps {
  handleSignUp: MouseEventHandler<HTMLParagraphElement>,
  handleLogIn: MouseEventHandler<HTMLParagraphElement>,
  currentUser: any,
  signOut: Function,
  toggleEditProfilePage: Function,
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
  signOut: Function,
  toggleEditProfilePage: Function,
};

interface EditProfileProps {
  currentUser: any,
  toggleEditProfilePage: Function,
};

interface HomePageWebProps {
  currentUser: any,
}

interface postType {
  text?: boolean,
  img?: boolean,
  link?: boolean,
};

interface TextFormProps {
  handleFormSubmission: FormEventHandler<HTMLFormElement>,
};

interface PostNavProps {
  handlePostType: Function,
}

interface FeedProps {
  sortedData: Object,
  handleViewPost: Function,
  handleUpVote: Function,
  handleDownVote: Function,
  handleFavoritePost: Function,
};

interface SortNavProps {
  handleSortChange: Function,
  sortType: { type: string; },
};

interface ViewPostProps {
  viewing: {},
};

export {
  type HeaderProps,
  type SignUpProps,
  type SignInProps,
  type CreateAccountProps,
  type userState,
  type LogInProps,
  type AccountDisplayProps,
  type EditProfileProps,
  type postType,
  type TextFormProps,
  type PostNavProps,
  type HomePageWebProps,
  type FeedProps,
  type SortNavProps,
  type ViewPostProps,
};