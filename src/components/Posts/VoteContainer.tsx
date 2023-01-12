import React, { FC } from "react";
import upVoteSVG from '../../assets/arrow-up.svg';
import downVoteSVG from '../../assets/arrow-down.svg';
import { VoteContainerProps } from "../../types/interfaces";
import { User } from "firebase/auth";
import '../../styles/Posts/VoteContainer.css';

const VoteContainer: FC<VoteContainerProps> = (props): JSX.Element => {

  const { 
    user,
    post,
    whoLiked,
    whoDisliked,
    handleUpVotePost,
    handleDownVotePost
  } = props;

  const activateVoteAnimation = (e: React.MouseEvent<HTMLImageElement, MouseEvent>): void => {

    const targetEl = e.target as Element;

    targetEl.classList.remove('voting');
    setTimeout(() => {
      targetEl.classList.add('voting');
    }, 0);

    return;

  };

  const handleVoteEvent = (vote: string, e: any): void => {

    activateVoteAnimation(e);

    if (typeof user === "string") {
      alert('you must be signed in to change vote count');
      return;
    }
    
    if (vote === "upvote") {
      setTimeout(() => {
        handleUpVotePost(post, e);
      }, 500);
      return;
    };

    if (vote === "downvote") {
      setTimeout(() => {
        handleDownVotePost(post, e);
      }, 500);
      return;
    };
  };

  const userRef = user as User;

  if (whoLiked.includes(userRef.uid)) {
    return (
      <div className="upvote-downvote-container">
        <img 
          id="svg-upvote"
          className="upvote-svg"
          src={upVoteSVG}
          alt="upvote arrow"
          onClick={(e) => {
            handleVoteEvent("upvote", e);
          }} >
        </img>
        <p className="upvote-count-text">
          {(post.likes - post.dislikes) > 0 ? post.likes - post.dislikes : 0}
        </p>
        <img 
          id="svg-downvote"
          className="not-downvoted"
          src={downVoteSVG}
          alt="downvote arrow"
          onClick={(e) => {
            handleVoteEvent("downvote", e);
          }} >
        </img>
      </div>
    );
  };

  if (whoDisliked.includes(userRef.uid)) {
    return (
      <div className="upvote-downvote-container">
        <img 
          id="svg-upvote"
          className="not-upvoted"
          src={upVoteSVG}
          alt="upvote arrow"
          onClick={(e) => {
            handleVoteEvent("upvote", e);
          }} >
        </img>
        <p className="upvote-count-text">
          {(post.likes - post.dislikes) > 0 ? post.likes - post.dislikes : 0}
        </p>
        <img 
          id="svg-downvote"
          className="downvote-svg"
          src={downVoteSVG}
          alt="downvote arrow"
          onClick={(e) => {
            handleVoteEvent("downvote", e);
          }} >
        </img>
      </div>
    );
  };

  return (
    <div className="upvote-downvote-container">
      <img 
        id="svg-upvote"
        className="upvote-svg"
        src={upVoteSVG}
        alt="upvote arrow"
        onClick={(e) => {
          handleVoteEvent("upvote", e);
        }} >
      </img>
      <p className="upvote-count-text">
        {(post.likes - post.dislikes) > 0 ? post.likes - post.dislikes : 0}
      </p>
      <img 
        id="svg-downvote"
        className="downvote-svg"
        src={downVoteSVG}
        alt="downvote arrow"
        onClick={(e) => {
          handleVoteEvent("downvote", e);
        }} >
      </img>
    </div>
  );
};

export default VoteContainer;