import React, { FC } from "react";
import { CommentsProps, Post, Comment } from "../../types/interfaces";
import upVoteSVG from '../../assets/arrow-up.svg';
import downVoteSVG from '../../assets/arrow-down.svg';
import uniqid from 'uniqid';
import { User } from "firebase/auth";
import '../../styles/Posts/Comments.css';

const Comments: FC<CommentsProps> = (props): JSX.Element => {

  const { 
    user,
    viewing,
    commentList,
    handleUpVoteComment,
    handleDownVoteComment
  } = props;

  // for saving comment to correct post on firebase
  const viewingRef = viewing as Post;
  const userRef = user as User;

  // default is to sort by most likes
  const sortedComments = commentList.sort(function compareLikes(a, b): any {

    if (a.likes > b.likes) {
      return -1;
    };

    if (a.likes < b.likes) {
      return 1;
    };

    return 0;

  });

  return (
    <div className="comment-list">
      {Array.isArray(sortedComments) && commentList.map((comment) => {

        if (comment.whoLiked.includes(userRef.uid)) {
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
              <img className="not-downvoted"
                src={downVoteSVG}
                alt="downvote arrow"
                style={{width: "3vw", height: "3vh"}}
                onClick={() => handleDownVoteComment(viewingRef, comment)} 
                data-testid="downvote-test" >
              </img>
            </div>
          </div>
        }

        if (comment.whoDisliked.includes(userRef.uid)) {
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
              <img className="not-upvoted"
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
        };

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