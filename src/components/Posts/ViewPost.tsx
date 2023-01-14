import React, { FC, useEffect, useState } from "react";
import { ViewPostProps } from "../../types/interfaces";
import { Post } from "../../types/interfaces";
import ViewNav from "./ViewNav";
import Comments from "./Comments";
import AddComment from "./AddComent";
import '../../styles/Posts/ViewPost.css';

// firebase imports
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";

const ViewPost: FC<ViewPostProps> = (props): JSX.Element => {

  const { 
    user,
    viewing,
    handleUpVotePost,
    handleDownVotePost,
    handleFavoritePost,
    handleStopViewingPost,
    handleUpVoteComment,
    handleDownVoteComment,
  } = props

  const viewingRef = viewing as Post,
        userRef = user as User;

  const [viewingPost, setViewingPost] = useState({
    post: viewing,
  });

  // firebaseConfig
  const firebaseConfig = {
    apiKey: "AIzaSyDsPecBa3Ch5uDw4UzHiJWAjKEYOKCrNdA",
    authDomain: "espressit.firebaseapp.com",
    projectId: "espressit",
    storageBucket: "espressit.appspot.com",
    messagingSenderId: "1094129721341",
    appId: "1:1094129721341:web:dc2bdc0a2b322504b04394"
  },
  // Initialize Firebase
  app = initializeApp(firebaseConfig),
  db = getFirestore(app);

  const handleAddCommentToPost = (scrubbedComment: string): void => {

    (async function saveComment() {

      // gather and set comment data
      const userInstanceRef = doc(db, "users", userRef.uid);
      const getUserInstanceSnap = await getDoc(userInstanceRef);

      if (getUserInstanceSnap.exists()) {
        const newComment = {
          account: getUserInstanceSnap.data().username,
          author: userRef.uid,
          comment: scrubbedComment,
          dislikes: 0,
          likes: 1,
          pid: viewingRef.pid,
          time: new Date().toLocaleString(),
          whoDisliked: [],
          whoLiked: [userRef.uid],
        };

        // add new comment to comment list
        const postRef = doc(db, "posts", viewingRef.pid);
        await updateDoc(postRef, {
          comments: [...viewingRef.comments, newComment],
        });

        // update local data to match db for rendering
        viewingRef.comments = [...viewingRef.comments, newComment];
        setViewingPost({
          post: viewingRef,
        });

        // get user data to save comment to user for deletion or modification later
        const getUserDBRef = doc(db, "users", userRef.uid),
              getUserDBSnap = await getDoc(getUserDBRef);

        // set newComment in user data with other comments
        if (getUserDBSnap.exists()) {

          const userDBData = getUserDBSnap.data(),
                setUserDBRef = doc(db, "users", userRef.uid);

          await updateDoc(setUserDBRef, {
            comments: [...userDBData.comments, newComment],
          });

        };

      };

    })();

  };

  // hides CreatePost component when viewing a post, unmounts when leaving view post
  useEffect(() => {

    // increment view count on post
    (async function incrementViewsOnPost() {

      const postRef = doc(db, "posts", viewingRef.pid),
            postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const post = postSnap.data();
        await updateDoc(postRef, {
          views: post.views += 1,
        });
      };
      
    })();

    const createPostContainer = document.querySelector('.create-post-container');

    if (createPostContainer) {
      createPostContainer.classList.remove('create-post-container');
      createPostContainer.classList.add('hidden-create-post-container');
    };

    return () => {

      if (createPostContainer) {
        createPostContainer.classList.add('create-post-container');
        createPostContainer.classList.remove('hidden-create-post-container');
      };

    };
    
  }, []);

  // when  no img or link are present
  if (viewingRef.imgURL.length === 0 && viewingRef.link.length === 0) {
    return (
      <>
        <ViewNav 
          user={user}
          viewing={viewing}
          handleUpVotePost={handleUpVotePost}
          handleDownVotePost={handleDownVotePost}
          handleFavoritePost={handleFavoritePost}
          handleStopViewingPost={handleStopViewingPost}
        />
        <div className="post-view-container">
          <div className="post-view">
            <div className="content-view-container">
              <h5 className="post-account-time">
                {`${viewingRef.account}`}
              </h5>
              <h1 className="post-view-title" >
                {viewingRef.title}
              </h1>
              <h6 className="post-view-link">
                {viewingRef.link}
              </h6>
              <h3 className="post-view-description" >
                {viewingRef.body}
              </h3>
              <p className="post-views-text">
                <em>{viewingRef.views} Views</em>
              </p>
            </div>
          </div>
          <AddComment 
            user={user}
            viewing={viewing}
            handleAddCommentToPost={handleAddCommentToPost}
          />
          <Comments 
            user={user}
            viewing={viewing}
            commentList={viewingRef.comments}
            handleUpVoteComment={handleUpVoteComment}
            handleDownVoteComment={handleDownVoteComment}
          />
        </div>
      </>
    );

    // when img is included
  } else if (viewingRef.imgURL.length === 0 && viewingRef.link.length !== 0) {
    return (
      <>
        <ViewNav 
          user={user}
          viewing={viewing}
          handleUpVotePost={handleUpVotePost}
          handleDownVotePost={handleDownVotePost}
          handleFavoritePost={handleFavoritePost}
          handleStopViewingPost={handleStopViewingPost}
        />
        <div className="post-view-container">
          <div className="post-view">
            <div className="content-view-container">
              <h5 className="post-account-time">
                {`${viewingRef.account}`}
              </h5>
              <h1 className="post-view-title" >
                {viewingRef.title}
              </h1>
              <a className="post-view-link" href={viewingRef.link}>
                {viewingRef.link}
              </a>
              <h3 className="post-view-description" >
                {viewingRef.body}
              </h3>
              <p className="post-views-text">
                <em>{viewingRef.views} Views</em>
              </p>
            </div>
          </div>
          <AddComment 
            user={user}
            viewing={viewing}
            handleAddCommentToPost={handleAddCommentToPost}
          />
          <Comments 
            user={user}
            viewing={viewing}
            commentList={viewingRef.comments}
            handleUpVoteComment={handleUpVoteComment}
            handleDownVoteComment={handleDownVoteComment}
          />
        </div>
      </>
    );

    // when a link is present, but no img
  } else if (viewingRef.imgURL.length !== 0 && viewingRef.link.length === 0) {
    return (
     <>
      <ViewNav 
        user={user}
        viewing={viewing}
        handleUpVotePost={handleUpVotePost}
        handleDownVotePost={handleDownVotePost}
        handleFavoritePost={handleFavoritePost}
        handleStopViewingPost={handleStopViewingPost}
      />
       <div className="post-view-container">
        <div className="post-view">
          <div className="content-view-container">
            <h5 className="post-account-time">
              {`${viewingRef.account}`}
            </h5>
            <h1 className="post-view-title" >
              {viewingRef.title}
            </h1>
            <img className="post-view-img"
              alt="user post"
              src={viewingRef.imgURL} >
            </img>
            <h3 className="post-view-description" >
              {viewingRef.body}
            </h3>
            <p className="post-views-text">
              <em>{viewingRef.views} Views</em>
            </p>
          </div>
        </div>
        <AddComment 
            user={user}
            viewing={viewing}
            handleAddCommentToPost={handleAddCommentToPost}
          />
          <Comments 
            user={user}
            viewing={viewing}
            commentList={viewingRef.comments}
            handleUpVoteComment={handleUpVoteComment}
            handleDownVoteComment={handleDownVoteComment}
          />
      </div>
     </>
    );
  } else {
    return (
      <p>Error, we're not sure what happened there :/</p>
    );
  };
  
};

export default ViewPost;