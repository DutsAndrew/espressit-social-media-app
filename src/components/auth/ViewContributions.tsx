import React, { FC, useEffect, useState, MouseEvent } from "react";
import { ViewContributionsProps, ViewContributionsDbData, Post, Comment } from "../../types/interfaces";
import deleteSVG from '../../assets/delete.svg';
import uniqid from 'uniqid';
import '../../styles/ViewContributions.css';
import { deleteDoc, doc, DocumentData, DocumentSnapshot, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc } from "firebase/firestore";

const ViewContributions: FC<ViewContributionsProps> = (props): JSX.Element => {

  const { currentUser, toggleViewContributionsPage } = props;

  const [viewing, setViewing] = useState({
    current: '',
  });

  const [dbData, setDbData] = useState<ViewContributionsDbData>({
    posts: [],
    comments: [],
    favorites: [],
  });

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

  useEffect(() => {
    // query db for posts, comments, and favorites on mount
    (async function fetchDataFromDb() {
      const userInstanceRef = doc(db, "users", userRef.uid);
      const userInstanceSnap = await getDoc(userInstanceRef);
      if (userInstanceSnap.exists()) {
        
        // save posts, comments, favorites to local state for use
        const posts = userInstanceSnap.data().posts;
        const comments = userInstanceSnap.data().comments;
        const favorites = userInstanceSnap.data().favoritePosts;

        setDbData({
          posts: posts,
          comments: comments,
          favorites: favorites,
        });

      };

    })();
  }, []);

  const handleViewChange = (change: string): void => {
    setViewing({
      current: change,
    });

  };

  const handleDeleteEvent = async (type: string, itemToDelete: Post | Comment): Promise<void> => {

    const userInstanceRef = doc(db, "users", userRef.uid);
    const userInstanceSnap = await getDoc(userInstanceRef);

    if (userInstanceSnap.exists()) {
      // access granted to userInstance

      if (type === "post") {
        deletePost(userInstanceSnap.data().posts, (itemToDelete as Post), userInstanceRef);
        return;
      };
  
      if (type === "comment") {
        deleteComment(userInstanceSnap.data().comments, (itemToDelete as Comment), userInstanceRef);
        return;
      };
  
      if (type === "favorite") {
        deleteFavorite(userInstanceSnap.data().favoritePosts, (itemToDelete as Post), userInstanceRef);
        return;
      };
    };
  };

  const deletePost = async (userInstanceData: Post, itemToDelete: Post, userInstanceRef: any): Promise<void> => {
     // remove userInstance of post
     const postList: any[] = (userInstanceData as any);
     const filteredList: any[] = postList.filter((element: Post) => element.pid !== (itemToDelete as Post).pid);
     await updateDoc(userInstanceRef, {
       posts: filteredList,
     });

     // remove posts instance of post
     await deleteDoc(doc(db, "posts", (itemToDelete as Post).pid));

     setDbData({
       posts: filteredList,
       comments: dbData.comments,
       favorites: dbData.favorites,
     });

     return;
  };

  const deleteComment = async (userInstanceData: Post, itemToDelete: Comment, userInstanceRef: any): Promise<void> => {
    // remove userInstance of post
    const commentList: any[] = (userInstanceData as any);
    const filteredList: any[] = commentList.filter((comment: Comment) => (comment as Comment).comment !== (itemToDelete as Comment).comment);

    await updateDoc(userInstanceRef, {
      comments: filteredList,
    });

   // get post from db to remove comment from post instance
   const postRef = doc(db, "posts", (itemToDelete as Comment).pid);
   const postSnap = await getDoc(postRef);

   if (postSnap.exists()) {

     const commentList = postSnap.data().comments;
     const filteredList = commentList.filter((comment: Comment) => (comment as Comment).comment !== (itemToDelete as Comment).comment);

     await updateDoc(postRef, {
       comments: filteredList,
     });

   } else {
     alert('we were not able to remove your comment from the original post, but it was removed from your account; please reach out to dutsandrew@gmail.com to resolve this issue');
   };

   setDbData({
     posts: dbData.posts,
     comments: filteredList,
     favorites: dbData.favorites,
   });

   return;
  };

  const deleteFavorite = async (userInstanceData: Post, itemToDelete: Post, userInstanceRef: any): Promise<void> => {
    const favoritesList: any[] = (userInstanceData as any);
    const filteredList: any[] = favoritesList.filter((element: Post) => element.pid !== itemToDelete.pid);

    await updateDoc(userInstanceRef, {
      favoritePosts: filteredList,
    });

    setDbData({
      posts: dbData.posts,
      comments: dbData.comments,
      favorites: filteredList,
    });
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
          {Array.isArray(dbData.posts) && dbData.posts.map((post) => {
            return <div className="view-contributions-post"
              key={uniqid()}>
              <p 
                className="view-contributions-post-text">
                {post.title.length > 75 ? post.title.slice(0, 75).concat('...') : post.title}
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
          {Array.isArray(dbData.comments) && dbData.comments.map((comment) => {
            return <div className="view-contributions-comments"
              key={uniqid()}>
              <p 
                className="view-contributions-comment-text">
                {comment.comment.length > 75 ? comment.comment.slice(0, 75).concat('...') : comment.comment}
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
          {Array.isArray(dbData.favorites) && dbData.favorites.map((favorite) => {
            return <div className="view-contributions-favorite"
              key={uniqid()}>
              <p 
                className="view-contributions-favorite-text">
                {favorite.title.length > 75 ? favorite.title.slice(0, 75).concat('...') : favorite.title}
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