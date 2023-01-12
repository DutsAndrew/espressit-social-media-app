import React, { FC } from "react";
import { ContentContainerProps, Post } from "../../types/interfaces";
import favoriteSVG from '../../assets/save.svg';
import commentSVG from '../../assets/comment.svg';
import '../../styles/Posts/ContentContainer.css';

const ContentContainer: FC<ContentContainerProps> = (props): JSX.Element => {

  const { user, post, handleViewPost, handleFavoritePost } = props;

  const callHandleViewPost = (post: Post): void => {
    handleViewPost(post);
  };

  const callHandleFavoritePost = (post: Post): void => {
    if (typeof user === "string") {
      alert('you must be signed in to favorite a post');
      return;
    }
    handleFavoritePost(post);
  };

  if (post.imgURL.length === 0 && post.link.length === 0) {
    return (
      <div className="content-container">
        <h1 className="post-title"
          onClick={() => callHandleViewPost(post)} >
          {post.title.length > 75 ? post.title.slice(0, 75).concat('...') : post.title}
        </h1>
        <h3 className="post-description"
          onClick={() => callHandleViewPost(post)} >
          {post.body.length > 400 ? post.body.slice(0, 400).concat('...') : post.body}
        </h3>
        <div className="post-footer-container">
          <img className="post-comment-svg"
            src={commentSVG}
            alt="comment box"
            onClick={() => callHandleViewPost(post)} >
          </img>
          <p className="post-comment-amount">{post.comments.length}</p>
          <img className="post-favorite-svg"
            src={favoriteSVG}
            alt="save icon"
            onClick={() => callHandleFavoritePost(post)} >
          </img>
        </div>
      </div>
    );
  };

  if (post.link.length !== 0 && post.imgURL.length === 0) {
    return (
      <div className="content-container">
        <h1 className="post-title"
          onClick={() => callHandleViewPost(post)} >
          {post.title.length > 75 ? post.title.slice(0, 75).concat('...') : post.title}
        </h1>
        <h3 className="post-description"
          onClick={() => callHandleViewPost(post)} >
          {post.body.length > 400 ? post.body.slice(0, 400).concat('...') : post.body}
        </h3>
        <a className="post-link"
          href={post.link} >
          {post.link.slice(0, 50)}
        </a>
        <div className="post-footer-container">
          <img className="post-comment-svg"
            src={commentSVG} 
            alt="comment box" 
            onClick={() => callHandleViewPost(post)} >
          </img>
          <p className="post-comment-amount">{post.comments.length}</p>
          <img className="post-favorite-svg"
            src={favoriteSVG}
            alt="save icon"
            onClick={() => callHandleFavoritePost(post)} >
          </img>
        </div>
      </div>
    );
  };

  if (post.link.length === 0 && post.imgURL.length !== 0) {
    return (
      <div className="content-container">
        <h1 className="post-title"
          onClick={() => callHandleViewPost(post)} >
          {post.title.length > 75 ? post.title.slice(0, 75).concat('...') : post.title}
        </h1>
        <img className="post-img"
          src={post.imgURL}
          alt="user post"
          onClick={() => callHandleViewPost(post)} >
        </img>
        <h3 className="post-description"
          onClick={() => callHandleViewPost(post)} >
          {post.body.length > 400 ? post.body.slice(0, 400).concat('...') : post.body}
        </h3>
        <div className="post-footer-container">
          <img className="post-comment-svg"
            src={commentSVG}
            alt="comment box"
            onClick={() => callHandleViewPost(post)} >
          </img>
          <p className="post-comment-amount">{post.comments.length}</p>
          <img className="post-favorite-svg"
            src={favoriteSVG}
            alt="save icon"
            onClick={() => callHandleFavoritePost(post)} >
          </img>
        </div>
      </div>
    );
  };

  if  (post.link.length !== 0 && post.imgURL.length !== 0) {
    return (
      <div className="content-container">
        <h1 className="post-title"
          onClick={() => callHandleViewPost(post)} >
          {post.title.length > 75 ? post.title.slice(0, 75).concat('...') : post.title}
        </h1>
        <img className="post-img"
          src={post.imgURL}
          alt="user post"
          onClick={() => callHandleViewPost(post)} >
        </img>
        <h3 className="post-description"
          onClick={() => callHandleViewPost(post)} >
          {post.body.length > 400 ? post.body.slice(0, 400).concat('...') : post.body}
        </h3>
        <a className="post-link"
          href={post.link} >
          {post.link.slice(0, 50)}
        </a>
        <div className="post-footer-container">
          <img className="post-comment-svg"
            src={commentSVG}
            alt="comment box"
            onClick={() => callHandleViewPost(post)} >
          </img>
          <p className="post-comment-amount">{post.comments.length}</p>
          <img className="post-favorite-svg"
            src={favoriteSVG}
            alt="save icon"
            onClick={() => callHandleFavoritePost(post)} >
          </img>
        </div>
      </div>
    );
  };

  return (
    <p>Error, something went wrong, please try again!</p>
  );

};

export default ContentContainer;