import React, { FC } from "react";
import upVoteSVG from '../../../assets/arrow-up.svg';
import downVoteSVG from '../../../assets/arrow-down.svg';
import { VoteContainerProps } from "../../../types/interfaces";

const VoteContainer: FC<VoteContainerProps> = (props): JSX.Element => {

  const { post, whoLiked, whoDisliked, handleUpVotePost, handleDownVotePost} = props;

  const activateVoteAnimation = (e: React.MouseEvent<HTMLImageElement, MouseEvent>): void => {

    const targetEl = e.target as Element;

    targetEl.classList.remove('voting');
    setTimeout(() => {
      targetEl.classList.add('voting');
    }, 0);

    return;

  };

  return (
    <div className="upvote-downvote-container">
      <img className="upvote-svg"
        src={upVoteSVG}
        alt="upvote arrow"
        style={{width: "3vw", height: "3vh"}}
        onClick={(e) => {
          activateVoteAnimation(e);
          setTimeout(() => {
            handleUpVotePost(post, e);
          }, 500);
        }} >
      </img>
      <p className="upvote-count-text">
        {(post.likes - post.dislikes) > 0 ? post.likes - post.dislikes : 0}
      </p>
      <img className="downvote-svg"
        src={downVoteSVG}
        alt="downvote arrow"
        style={{width: "3vw", height: "3vh"}}
        onClick={(e) => {
          activateVoteAnimation(e);
          setTimeout(() => {
            handleDownVotePost(post, e);
          }, 500);
        }} >
      </img>
      </div>
  );
};

export default VoteContainer;