import { MouseEventHandler, FormEventHandler } from 'react';
import { User } from "firebase/auth";

interface HeaderProps {
  handleSignUp: MouseEventHandler<HTMLParagraphElement>,
  handleLogIn: MouseEventHandler<HTMLParagraphElement>,
  currentUser: string | User,
  signOut: Function,
  toggleEditProfilePage: Function,
  toggleViewContributionsPage: Function,
};

interface SignUpProps {
  handleSignUp: MouseEventHandler<HTMLParagraphElement>,
};

interface SignInProps {
  handleLogIn: MouseEventHandler<HTMLParagraphElement>,
};

interface CreateAccountProps {
  createAccountWithEmailAndPassword: Function,
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
  toggleViewContributionsPage: Function,
};

interface UserInstance {
  user: {
    comments: any[],
    displayName: string,
    favoritePosts: any[],
    posts: any[],
    imgURL: string,
    uid: string,
    username: string,
  },
};

interface EditProfileProps {
  currentUser: string | User,
  toggleEditProfilePage: Function,
  returnToMainAfterProfileEdit: Function,
};

interface ViewContributionsProps {
  currentUser: string | User,
  toggleViewContributionsPage: Function,
};

interface ViewContributionsDbData {
  posts: any[],
  comments: any[],
  favorites: any[],
};

interface HomePageWebProps {
  currentUser: string | User,
}

interface CreatePostProps {
  user: string | User,
  fetchNewPost: Function,
};

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
  newPostStatus: boolean,
  newPostFetched: Function,
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
  author: string,
  body: string,
  comments: any[],
  dislikes: number,
  imgURL: string,
  imgURLRef: string,
  likes: number,
  link: string,
  pid: string,
  time: string,
  title: string,
  views: number,
  whoDisliked: any[],
  whoLiked: any[],
};

type Comment = {
  account: string;
  author: string;
  time: string;
  comment: string;
  dislikes: number;
  likes: number;
  pid: string;
  whoLiked: string[];
  whoDisliked: string[];
}

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
  type ViewContributionsProps,
  type ViewContributionsDbData,
  type postType,
  type TextFormProps,
  type PostNavProps,
  type HomePageWebProps,
  type CreatePostProps,
  type PostProps,
  type FeedProps,
  type VoteContainerProps,
  type ContentContainerProps,
  type SortNavProps,
  type ViewPostProps,
  type ViewNavProps,
  type Post,
  type Comment,
  type PostData,
  type CommentsProps,
  type AddCommentProps,
};