import React, { FC } from "react";
import favoriteSVG from '../../../assets/save.svg';
import commentSVG from '../../../assets/comment.svg';
import { ContentContainerProps, Post } from "../../../types/interfaces";

const ContentContainer: FC<ContentContainerProps> = (props): JSX.Element => {

  const { post, handleViewPost, handleFavoritePost } = props;

  const callHandleViewPost = (post: Post): void => {
    handleViewPost(post);
  };

  const callHandleFavoritePost = (post: Post): void => {
    handleFavoritePost(post);
  };

  if (post.img.length === 0 && post.link.length === 0) {
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
            style={{width: "2vw", height: "2vh"}}
            onClick={() => callHandleViewPost(post)} >
          </img>
          <p className="post-comment-amount">{post.comments.length}</p>
          <img className="post-favorite-svg"
            src={favoriteSVG}
            alt="save icon"
            style={{width: "2vw", height: "2vh"}}
            onClick={() => callHandleFavoritePost(post)} >
          </img>
        </div>
      </div>
    );
  };

  if (post.link.length !== 0 && post.img.length === 0) {
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
            style={{width: "2vw", height: "2vh"}}
            onClick={() => callHandleViewPost(post)} >
          </img>
          <p className="post-comment-amount">{post.comments.length}</p>
          <img className="post-favorite-svg"
            src={favoriteSVG}
            alt="save icon"
            style={{width: "2vw", height: "2vh"}}
            onClick={() => callHandleFavoritePost(post)} >
          </img>
        </div>
      </div>
    );
  };

  if (post.link.length === 0 && post.img.length !== 0) {
    return (
      <div className="content-container">
        <h1 className="post-title"
          onClick={() => callHandleViewPost(post)} >
          {post.title.length > 75 ? post.title.slice(0, 75).concat('...') : post.title}
        </h1>
        <img className="post-img"
          src={post.img}
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
            style={{width: "2vw", height: "2vh"}}
            onClick={() => callHandleViewPost(post)} >
          </img>
          <p className="post-comment-amount">{post.comments.length}</p>
          <img className="post-favorite-svg"
            src={favoriteSVG}
            alt="save icon"
            style={{width: "2vw", height: "2vh"}}
            onClick={() => callHandleFavoritePost(post)} >
          </img>
        </div>
      </div>
    );
  };

  if  (post.link.length !== 0 && post.img.length !== 0) {
    return (
      <div className="content-container">
        <h1 className="post-title"
          onClick={() => callHandleViewPost(post)} >
          {post.title.length > 75 ? post.title.slice(0, 75).concat('...') : post.title}
        </h1>
        <img className="post-img"
          src={post.img}
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
            style={{width: "2vw", height: "2vh"}}
            onClick={() => callHandleViewPost(post)} >
          </img>
          <p className="post-comment-amount">{post.comments.length}</p>
          <img className="post-favorite-svg"
            src={favoriteSVG}
            alt="save icon"
            style={{width: "2vw", height: "2vh"}}
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