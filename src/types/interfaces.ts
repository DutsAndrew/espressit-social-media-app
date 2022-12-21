import { MouseEventHandler, FormEventHandler } from 'react';
import { User } from "firebase/auth";

interface HeaderProps {
  handleSignUp: MouseEventHandler<HTMLParagraphElement>,
  handleLogIn: MouseEventHandler<HTMLParagraphElement>,
  currentUser: string | User,
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
  currentUser: string | User,
  errorStatus: string | User,
};

interface LogInProps {
  signInUser: (email: string, password: string) => Promise<void>,
  handleLogIn: MouseEventHandler<HTMLButtonElement>,
  signInWithGoogleAccount: () => Promise<void>,
};

interface AccountDisplayProps {
  currentUser: string | User,
  signOut: Function,
  toggleEditProfilePage: Function,
};

interface EditProfileProps {
  currentUser: string | User,
  toggleEditProfilePage: Function,
};

interface HomePageWebProps {
  currentUser: string | User,
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

interface PostProps {
  user: string | User,
};

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
  type PostProps,
  type FeedProps,
  type SortNavProps,
  type ViewPostProps,
};