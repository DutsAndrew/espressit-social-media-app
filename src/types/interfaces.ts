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
  createAccountWithEmailAndPassword: (username: string, email: string, password: string) => Promise<void>,
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

interface UserInstance {
  user: {
    comments: any[],
    displayName: string,
    favoritePosts: any[],
    posts: any[],
    profileImg: string,
    uid: string,
    username: string,
  },
};

interface EditProfileProps {
  currentUser: string | User,
  toggleEditProfilePage: Function,
  returnToMainAfterProfileEdit: Function,
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
  user: string | User,
  sortedData: Object,
  handleViewPost: Function,
  handleUpVotePost: Function,
  handleDownVotePost: Function,
  handleFavoritePost: Function,
};

interface VoteContainerProps {
  user: string | User,
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
  user: string | User,
  viewing: Object,
  handleUpVotePost: Function,
  handleDownVotePost: Function,
  handleFavoritePost: Function,
  handleStopViewingPost: Function,
  handleUpVoteComment: Function,
  handleDownVoteComment: Function,
};

interface ViewNavProps {
  user: string | User,
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
  user: string | User,
  viewing: Object,
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
  user: string | User,
  viewing: Object,
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
  type UserInstance,
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