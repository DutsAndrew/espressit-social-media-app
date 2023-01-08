import React, { FC, useEffect, useState } from "react";
import { ViewContributionsProps, ViewContributionsDbData } from "../../types/interfaces";
import deleteSVG from '../../assets/delete.svg';
import uniqid from 'uniqid';
import '../../styles/ViewContributions.css';
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const ViewContributions: FC<ViewContributionsProps> = (props): JSX.Element => {

  const { currentUser, toggleViewContributionsPage } = props;

  const [viewing, setViewing] = useState({
    current: '',
  });

  const [dbData, setDbData] = useState<ViewContributionsDbData>({
    data: [],
  });

  useEffect(() => {
    // query db for posts, comments, and favorites on mount
    (async function fetchDataFromDb() {
      // Initialize Firebase
      const firebaseConfig = {
        apiKey: "AIzaSyDsPecBa3Ch5uDw4UzHiJWAjKEYOKCrNdA",
        authDomain: "espressit.firebaseapp.com",
        projectId: "espressit",
        storageBucket: "espressit.appspot.com",
        messagingSenderId: "1094129721341",
        appId: "1:1094129721341:web:dc2bdc0a2b322504b04394"
      };
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      const userRef = currentUser as User;
      const postRef = doc(db, "users", userRef.uid);
      const postSnap = await getDoc(postRef);
      if (postSnap.exists()) {
        // save posts, comments, favorites to local state for use
      };

    })();
  }, []);

  const handleViewChange = (change: string): void => {

    fetchDataFromFirebase(change);

    setViewing({
      current: change,
    });

  };

  const fetchDataFromFirebase = (change: string): void => {

    if (change === "posts") {
      setDbData({
        data: postMock,
      });
      return;
    };

    if (change === "comments") {
      setDbData({
        data: commentsMock,
      });
      return;
    };

    if (change === "favorites") {
      setDbData({
        data: favoritesMock,
      });
      return;
    };

  };

  const handleDeleteEvent = (type: string, itemToDelete: Object): void => {

    if (type === "post") {
      return;
    };

    if (type === "comment") {
      return;
    };

    if (type === "favorite") {
      return;
    };

  };

  if (viewing.current.length === 0) {
    return (
      <div className="view-contributions-container">
        <button 
          className="close-view-contributions-button"
          onClick={() => toggleViewContributionsPage()} >
          Return to Home
        </button>
        <h1 className="view-contributions-prompt">
          Select one of the following:
        </h1>
        <div className="contributions-nav">
          <h2 
            className="contributions-post-selector"
            onClick={() => handleViewChange("posts")} >
            Posts
          </h2>
          <p className="contributions-nav-divider">
            |
          </p>
          <h2 
            className="contributions-comments-selector"
            onClick={() => handleViewChange("comments")} >
            Comments
          </h2>
          <p className="contributions-nav-divider">
            |
          </p>
          <h2 
            className="contributions-favorites-selector" 
            onClick={() => handleViewChange("favorites")} >
            Favorites
          </h2>
        </div>
      </div>
    );
  };

  if (viewing.current === "posts") {
    return (
      <div className="view-contributions-container">
        <button 
          className="close-view-contributions-button"
          onClick={() => toggleViewContributionsPage()} >
          Return to Home
        </button>
        <div className="contributions-nav">
          <h2 
            className="contributions-post-selector"
            onClick={() => handleViewChange("posts")} >
            Posts
          </h2>
          <p className="contributions-nav-divider">
            |
          </p>
          <h2 
            className="contributions-comments-selector"
            onClick={() => handleViewChange("comments")} >
            Comments
          </h2>
          <p className="contributions-nav-divider">
            |
          </p>
          <h2 
            className="contributions-favorites-selector" 
            onClick={() => handleViewChange("favorites")} >
            Favorites
          </h2>
        </div>
        <div 
          className="view-contributions-posts-container">
          {Array.isArray(dbData.data) && dbData.data.map((post) => {
            return <div className="view-contributions-post"
              key={uniqid()}>
              <p 
                className="view-contributions-post-text">
                {post.title}
              </p>
              <img 
                className="view-contributions-post-delete-svg"
                alt="delete icon"
                src={deleteSVG}
                onClick={() => handleDeleteEvent('post', post)} >
              </img>
            </div>
          })}
        </div>
      </div>
    );
  };

  if (viewing.current === "comments") {
    return (
      <div className="view-contributions-container">
        <button 
          className="close-view-contributions-button"
          onClick={() => toggleViewContributionsPage()} >
          Return to Home
        </button>
        <div className="contributions-nav">
          <h2 
            className="contributions-post-selector"
            onClick={() => handleViewChange("posts")} >
            Posts
          </h2>
          <p className="contributions-nav-divider">
            |
          </p>
          <h2 
            className="contributions-comments-selector"
            onClick={() => handleViewChange("comments")} >
            Comments
          </h2>
          <p className="contributions-nav-divider">
            |
          </p>
          <h2 
            className="contributions-favorites-selector" 
            onClick={() => handleViewChange("favorites")} >
            Favorites
          </h2>
        </div>
        <div 
          className="view-contributions-comments-container">
          {Array.isArray(dbData.data) && dbData.data.map((comment) => {
            return <div className="view-contributions-comments"
              key={uniqid()}>
              <p 
                className="view-contributions-comment-text">
                {comment.comment}
              </p>
              <img 
                className="view-contributions-comment-delete-svg"
                alt="delete icon"
                src={deleteSVG}
                onClick={() => handleDeleteEvent('comment', comment)} >
              </img>
            </div>
          })}
        </div>
      </div>
    );
  };

  if (viewing.current === "favorites") {
    return (
      <div className="view-contributions-container">
        <button 
          className="close-view-contributions-button"
          onClick={() => toggleViewContributionsPage()} >
          Return to Home
        </button>
        <div className="contributions-nav">
          <h2 
            className="contributions-post-selector"
            onClick={() => handleViewChange("posts")} >
            Posts
          </h2>
          <p className="contributions-nav-divider">
            |
          </p>
          <h2 
            className="contributions-comments-selector"
            onClick={() => handleViewChange("comments")} >
            Comments
          </h2>
          <p className="contributions-nav-divider">
            |
          </p>
          <h2 
            className="contributions-favorites-selector" 
            onClick={() => handleViewChange("favorites")} >
            Favorites
          </h2>
        </div>
        <div 
          className="view-contributions-favorites-container">
          {Array.isArray(dbData.data) && dbData.data.map((favorite) => {
            return <div className="view-contributions-favorite"
              key={uniqid()}>
              <p 
                className="view-contributions-favorite-text">
                {favorite.title}
              </p>
              <img 
                className="view-contributions-favorite-delete-svg"
                alt="delete icon"
                src={deleteSVG}
                onClick={() => handleDeleteEvent('favorite', favorite)} >
              </img>
            </div>
          })}
        </div>
      </div>
    );
  };

  return (
    <p>Error, please try again later</p>
  );
};

export default ViewContributions;