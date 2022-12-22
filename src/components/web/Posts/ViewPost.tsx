import React, { FC } from "react";
import { ViewPostProps } from "../../../types/interfaces";
import { Post } from "../../../types/interfaces";
import '../../../styles/ViewPost.css';
import ViewNav from "./ViewNav";
import Comments from "./Comments";
import AddComment from "./AddComent";

const ViewPost: FC<ViewPostProps> = (props): JSX.Element => {

  const { viewing,
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

  // when  no img or link are present
  if (viewingRef.img.length === 0 && viewingRef.link.length === 0) {
    return (
      <>
        <ViewNav viewing={viewing}
          handleUpVotePost={handleUpVotePost}
          handleDownVotePost={handleDownVotePost}
          handleFavoritePost={handleFavoritePost}
          handleStopViewingPost={handleStopViewingPost}
        />
        <div className="post-container">
          <div className="post">
            <div className="content-container">
              <h5 className="post-account-time">
                {`${viewingRef.account}, ${viewingRef.time}`}
              </h5>
              <h1 className="post-title" >
                {viewingRef.title.length > 75 ? viewingRef.title.slice(0, 75).concat('...') : viewingRef.title}
              </h1>
              <h3 className="post-description" >
                {viewingRef.body.length > 400 ? viewingRef.body.slice(0, 400).concat('...') : viewingRef.body}
              </h3>
              <p className="post-views-text">
                {viewingRef.views}
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
        <ViewNav viewing={viewing}
          handleUpVotePost={handleUpVotePost}
          handleDownVotePost={handleDownVotePost}
          handleFavoritePost={handleFavoritePost}
          handleStopViewingPost={handleStopViewingPost}
        />
        <div className="post-container">
          <div className="post">
            <div className="content-container">
              <h5 className="post-account-time">
                {`${viewingRef.account}, ${viewingRef.time}`}
              </h5>
              <h1 className="post-title" >
                {viewingRef.title.length > 75 ? viewingRef.title.slice(0, 75).concat('...') : viewingRef.title}
              </h1>
              <h6 className="post-link">
                {viewingRef.link}
              </h6>
              <h3 className="post-description" >
                {viewingRef.body.length > 400 ? viewingRef.body.slice(0, 400).concat('...') : viewingRef.body}
              </h3>
              <p className="post-views-text">
                {viewingRef.views}
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
      <ViewNav viewing={viewing}
          handleUpVotePost={handleUpVotePost}
          handleDownVotePost={handleDownVotePost}
          handleFavoritePost={handleFavoritePost}
          handleStopViewingPost={handleStopViewingPost}
        />
      <div className="post-container">
        <div className="post">
          <div className="content-container">
            <h5 className="post-account-time">
              {`${viewingRef.account}, ${viewingRef.time}`}
            </h5>
            <h1 className="post-title" >
              {viewingRef.title.length > 75 ? viewingRef.title.slice(0, 75).concat('...') : viewingRef.title}
            </h1>
            <img className="post-img" src={viewingRef.img} alt="user upload"></img>
            <h3 className="post-description" >
              {viewingRef.body.length > 400 ? viewingRef.body.slice(0, 400).concat('...') : viewingRef.body}
            </h3>
            <p className="post-views-text">
              {viewingRef.views}
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