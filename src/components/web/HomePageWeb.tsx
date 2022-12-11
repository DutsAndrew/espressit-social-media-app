import React from "react";
import '../../styles/HomePageWeb.css';
import CreatePostWeb from "./CreatePostWeb";

const HomePageWeb = () => {

  // create post container will be snapped to top of screen, should show account picture, create post

  // if user is logged in... return this:
  return (
    <div className="home-page-web">
      <CreatePostWeb />
      <div className="all-posts-container">
        
      </div>
    </div>
  );
};

export default HomePageWeb;