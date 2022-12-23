import React, { FC } from "react";
import { CommentsProps } from "../../../types/interfaces";
import upVoteSVG from '../../../assets/arrow-up.svg';
import downVoteSVG from '../../../assets/arrow-down.svg';
import uniqid from 'uniqid';

const Comments: FC<CommentsProps> = (props): JSX.Element => {

  const { commentList, handleUpVoteComment, handleDownVoteComment } = props;

  return (
    <div className="comment-list">
      {Array.isArray(commentList) && commentList.map((comment) => {
        return <div className="comment" key={uniqid()}>
          <div className="comment-info">
            <p className="comment-account-time-text">
              <strong>{comment.account}</strong>, <em>{comment.time}</em>
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
              onClick={() => handleUpVoteComment(comment)} 
              data-testid="upvote-test" >
            </img>
            <p className="upvote-count-text">
              {(comment.likes - comment.dislikes) > 0 ? comment.likes - comment.dislikes : 0}
            </p>
            <img className="downvote-svg"
              src={downVoteSVG}
              alt="downvote arrow"
              style={{width: "3vw", height: "3vh"}}
              onClick={() => handleDownVoteComment(comment)} 
              data-testid="downvote-test" >
            </img>
          </div>
        </div>
      })}
    </div>
  );

};

export default Comments;