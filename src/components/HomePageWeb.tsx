import React, { FC, useState, lazy, Suspense } from "react";
import '../styles/HomePageWeb.css';
import { HomePageWebProps } from "types/interfaces";
import Posts from "./Posts/Posts";
import LoadingBar from "./LoadingBar";

// lazy load for anything that doesn't render on the first load
const CreatePostWeb = lazy(() => import('./CreatePost/CreatePostWeb'));

const HomePageWeb: FC<HomePageWebProps> = (props): JSX.Element => {

  const { currentUser } = props;

  const [newPost, setNewPost] = useState({
    status: false,
  });

  const fetchNewPost = () => {
    setNewPost({
      status: true,
    });
  };

  const newPostFetched = () => {
    setNewPost({
      status: false,
    });
  };

  // removes CreatePost components if user is not signed in
  if (typeof currentUser === 'string') {
   return (
    <div 
      id="home-page-web"
      className="home-page-web" 
    >
      <Posts
        user={currentUser}
        newPostStatus={newPost.status}
        newPostFetched={newPostFetched}
      />
    </div>
   );
  };

  return (
    <div 
      id="home-page-web"
      className="home-page-web" 
    >
      <Suspense fallback={<LoadingBar/>}>
        <CreatePostWeb
          user={currentUser}
          fetchNewPost={fetchNewPost}
        />
      </Suspense>
      <Posts
        user={currentUser}
        newPostStatus={newPost.status}
        newPostFetched={newPostFetched}
      />
    </div>
  );
};

export default HomePageWeb;