import React, { FC, useEffect } from "react";
import { ViewPostProps } from "../../../types/interfaces";
import { Post } from "../../../types/interfaces";
import '../../../styles/ViewPost.css';
import ViewNav from "./ViewNav";
import Comments from "./Comments";
import AddComment from "./AddComent";

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

  const viewingRef = viewing as Post;

  const handleAddCommentToPost = () => {

  };

  // hides CreatePost component when viewing a post, unmounts when leaving view post
  useEffect(() => {

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
  if (viewingRef.img.length === 0 && viewingRef.link.length === 0) {
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
          <AddComment handleAddCommentToPost={handleAddCommentToPost} />
          <Comments commentList={viewingRef.comments}
            handleUpVoteComment={handleUpVoteComment}
            handleDownVoteComment={handleDownVoteComment}
          />
        </div>
      </>
    );

    // when img is included
  } else if (viewingRef.img.length === 0 && viewingRef.link.length !== 0) {
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
          <AddComment handleAddCommentToPost={handleAddCommentToPost} />
          <Comments commentList={viewingRef.comments}
            handleUpVoteComment={handleUpVoteComment}
            handleDownVoteComment={handleDownVoteComment}
          />
        </div>
      </>
    );

    // when a link is present, but no img
  } else if (viewingRef.img.length !== 0 && viewingRef.link.length === 0) {
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
        <AddComment handleAddCommentToPost={handleAddCommentToPost} />
        <Comments commentList={viewingRef.comments}
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