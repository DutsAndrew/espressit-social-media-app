import React, { FC } from "react";
import '../../styles/HomePageWeb.css';
import CreatePostWeb from "./CreatePost/CreatePostWeb";
import { HomePageWebProps } from "../../types/interfaces";
import Posts from "./Posts/Posts";

const HomePageWeb: FC<HomePageWebProps> = (props): JSX.Element => {

  const { currentUser } = props;

  // removes CreatePost components if user is not signed in
  if (typeof currentUser === 'string') {
   return (
    <div className="home-page-web">
      <Posts user={currentUser} />
    </div>
   );
  };

  return (
    <div className="home-page-web">
      <CreatePostWeb user={currentUser} />
      <Posts user={currentUser} />
    </div>
  );
};

export default HomePageWeb;