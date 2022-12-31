import { MouseEventHandler, FormEventHandler } from 'react';
import { User } from "firebase/auth";

interface HeaderProps {
  handleSignUp: MouseEventHandler<HTMLParagraphElement>,
  handleLogIn: MouseEventHandler<HTMLParagraphElement>,
  currentUser: string | User,
  signOut: Function,
  toggleEditProfilePage: Function,
  toggleViewFavoritesPage: Function,
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
  toggleViewFavoritesPage: Function,
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
  handleUpVotePost: Function,
  handleDownVotePost: Function,
  handleFavoritePost: Function,
};

interface VoteContainerProps {
  post: Post,
  whoLiked: any[],
  whoDisliked: any[],
  handleUpVotePost: Function,
  handleDownVotePost: Function,
};

interface ContentContainerProps {
  post: Post,
  handleViewPost: Function,
  handleFavoritePost: Function,
};

interface SortNavProps {
  handleSortChange: Function,
  sortType: { type: string; },
};

interface ViewPostProps {
  viewing: Object,
  handleUpVotePost: Function,
  handleDownVotePost: Function,
  handleFavoritePost: Function,
  handleStopViewingPost: Function,
  handleUpVoteComment: Function,
  handleDownVoteComment: Function,
};

interface ViewNavProps {
  viewing: Object,
  handleUpVotePost: Function,
  handleDownVotePost: Function,
  handleFavoritePost: Function,
  handleStopViewingPost: Function,
};

type Post = {
  account: string,
  body: string,
  comments: any[],
  dislikes: number,
  img: string,
  likes: number,
  link: string,
  pid: string,
  time: string,
  title: string,
  views: number,
  whoDisliked: any[],
  whoLiked: any[],
};

type PostData = {
  data: any[],
};

interface CommentsProps {
  commentList: {
    account: string;
    time: string;
    comment: string;
    likes: number;
    dislikes: number;
    whoLiked: string[];
    whoDisliked: string[];
  }[],
  handleUpVoteComment: Function,
  handleDownVoteComment: Function,
};

interface AddCommentProps {
  handleAddCommentToPost: Function,
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
  type VoteContainerProps,
  type ContentContainerProps,
  type SortNavProps,
  type ViewPostProps,
  type ViewNavProps,
  type Post,
  type PostData,
  type CommentsProps,
  type AddCommentProps,
};