import React, { FC, useState } from "react";
import { FeedProps } from "../../../types/interfaces";
import upVoteSVG from '../../../assets/arrow-up.svg';
import downVoteSVG from '../../../assets/arrow-down.svg';
import saveSVG from '../../../assets/save.svg';
import commentSVG from '../../../assets/comment.svg';
import uniqid from 'uniqid';
import '../../../styles/Feed.css';

const Feed: FC<FeedProps> = (props): JSX.Element => {

  const { sortedData, handleViewPost, handleUpVote, handleDownVote, handleFavoritePost } = props;

  const viewPost = (postIndex: number): void => {
    viewPost(postIndex);
  };

  const favoriteIt = (postIndex: number): void => {
    handleFavoritePost(postIndex);
  };

  return (
    <div className="feed-container">
      {Array.isArray(sortedData) && sortedData.map((post) => {
        return <div className="post" key={uniqid()}>
          <div className="upvote-downvote-container">
            <img className="upvote-svg" src={upVoteSVG} alt="upvote arrow" style={{width: "3vw", height: "3vh"}} onClick={() => handleUpVote(post)} ></img>
            <p className="upvote-count-text">{(post.likes - post.dislikes) > 0 ? post.likes - post.dislikes : 0}</p>
            <img className="downvote-svg" src={downVoteSVG} alt="downvote arrow" style={{width: "3vw", height: "3vh"}} onClick={() => handleDownVote(post)} ></img>
          </div>
          <div className="content-container">
            <h1 className="post-title" onClick={() => viewPost(sortedData.indexOf(post))} >{post.title.length > 75 ? post.title.slice(0, 75).concat('...') : post.title}</h1>
              {/* create conditional render when an img or link is also present as h2s */}
            <h3 className="post-description" onClick={() => viewPost(sortedData.indexOf(post))} >{post.body.length > 400 ? post.body.slice(0, 400).concat('...') : post.body}</h3>
            <div className="post-footer-container">
              <img className="post-comment-svg" src={commentSVG} alt="comment box" style={{width: "2vw", height: "2vh"}} onClick={() => handleViewPost(sortedData.indexOf(post))} ></img>
              <p className="post-comment-amount">{post.comments.length}</p>
              <img className="post-save-svg" src={saveSVG} alt="save icon" style={{width: "2vw", height: "2vh"}} onClick={() => favoriteIt(sortedData.indexOf(post))} ></img>
            </div>
          </div>
        </div>
      })}
    </div>
  );
};

export default Feed;