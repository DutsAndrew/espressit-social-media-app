import React, { FC } from "react";
import { ViewPostProps } from "../../../types/interfaces";
import { Post } from "../../../types/interfaces";
import upVoteSVG from '../../../assets/arrow-up.svg';
import downVoteSVG from '../../../assets/arrow-down.svg';
import saveSVG from '../../../assets/save.svg';
import commentSVG from '../../../assets/comment.svg';

const ViewPost: FC<ViewPostProps> = (props): JSX.Element => {

  const { viewing, handleUpVote, handleDownVote, handleFavoritePost } = props

  const viewingRef = viewing as Post;

  return (
    <div className="post-container">
      <div className="post">
          <div className="upvote-downvote-container">
            <img className="upvote-svg"
              src={upVoteSVG}
              alt="upvote arrow"
              style={{width: "3vw", height: "3vh"}}
              onClick={() => handleUpVote(viewingRef)} >
            </img>
            <p className="upvote-count-text">
              {(viewingRef.likes - viewingRef.dislikes) > 0 ? viewingRef.likes - viewingRef.dislikes : 0}
            </p>
            <img className="downvote-svg"
              src={downVoteSVG}
              alt="downvote arrow"
              style={{width: "3vw", height: "3vh"}}
              onClick={() => handleDownVote(viewingRef)} >
            </img>
          </div>
          <div className="content-container">
            <h1 className="post-title" >
              {viewingRef.title.length > 75 ? viewingRef.title.slice(0, 75).concat('...') : viewingRef.title}
            </h1>
              {/* create conditional render when an img or link is also present as h2s */}
            <h3 className="post-description" >
              {viewingRef.body.length > 400 ? viewingRef.body.slice(0, 400).concat('...') : viewingRef.body}
            </h3>
          </div>
      </div>
    </div>
  );
};

export default ViewPost;