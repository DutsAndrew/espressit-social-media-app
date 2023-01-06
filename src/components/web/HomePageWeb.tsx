import React, { FC, useState } from "react";
import '../../styles/HomePageWeb.css';
import CreatePostWeb from "./CreatePost/CreatePostWeb";
import { HomePageWebProps } from "../../types/interfaces";
import Posts from "./Posts/Posts";

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
    <div className="home-page-web">
      <Posts
        user={currentUser}
        newPostStatus={newPost.status}
        newPostFetched={newPostFetched}
      />
    </div>
   );
  };

  return (
    <div className="home-page-web">
      <CreatePostWeb
        user={currentUser}
        fetchNewPost={fetchNewPost}
      />
      <Posts
        user={currentUser}
        newPostStatus={newPost.status}
        newPostFetched={newPostFetched}
      />
    </div>
  );
};

export default HomePageWeb;