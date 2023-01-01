import React, { FC } from "react";
import { CommentsProps, Post } from "../../../types/interfaces";
import upVoteSVG from '../../../assets/arrow-up.svg';
import downVoteSVG from '../../../assets/arrow-down.svg';
import uniqid from 'uniqid';

const Comments: FC<CommentsProps> = (props): JSX.Element => {

  const { 
    viewing,
    commentList,
    handleUpVoteComment,
    handleDownVoteComment
  } = props;

  // for saving comment to correct post on firebase
  const viewingRef = viewing as Post;

  return (
    <div className="comment-list">
      {Array.isArray(commentList) && commentList.map((comment) => {
        return <div className="comment" key={uniqid()}>
          <div className="comment-info">
            <p className="comment-account-time-text">
              <strong>{comment.account}</strong>
            </p>
            <p className="comment-text">
              {comment.comment}
            </p>
          </div>
          <div className="comment-interaction-container">
            <img className="upvote-svg"
              src={upVoteSVG}
              alt="upvote arrow"
              style={{width: "3vw", height: "3vh"}}
              onClick={() => handleUpVoteComment(viewingRef, comment)} 
              data-testid="upvote-test" >
            </img>
            <p className="upvote-count-text">
              {(comment.likes - comment.dislikes) > 0 ? comment.likes - comment.dislikes : 0}
            </p>
            <img className="downvote-svg"
              src={downVoteSVG}
              alt="downvote arrow"
              style={{width: "3vw", height: "3vh"}}
              onClick={() => handleDownVoteComment(viewingRef, comment)} 
              data-testid="downvote-test" >
            </img>
          </div>
        </div>
      })}
    </div>
  );

};

export default Comments;