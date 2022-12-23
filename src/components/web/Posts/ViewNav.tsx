import React, { FC } from "react";
import commentSVG from '../../../assets/comment.svg';
import favoriteSVG from '../../../assets/save.svg';
import closeSVG from '../../../assets/close.svg';
import upVoteSVG from '../../../assets/arrow-up.svg';
import downVoteSVG from '../../../assets/arrow-down.svg';
import { ViewNavProps } from "../../../types/interfaces";
import { Post } from "../../../types/interfaces";

const ViewNav: FC<ViewNavProps> = (props): JSX.Element => {

  const { viewing, handleUpVotePost, handleDownVotePost, handleFavoritePost, handleStopViewingPost } = props;

  const viewingRef = viewing as Post;

  return (
    <div className="view-nav-container">
      <div className="upvote-downvote-view-container">
        <img className="upvote-svg"
          src={upVoteSVG}
          alt="upvote arrow"
          style={{width: "3vw", height: "3vh"}}
          onClick={() => handleUpVotePost(viewing)} 
          data-testid="post-upvote-test" >
        </img>
        <p className="vote-counter-text">
          {(viewingRef.likes - viewingRef.dislikes) > 0 ? viewingRef.likes - viewingRef.dislikes : 0}
        </p>
        <img className="downvote-svg"
          src={downVoteSVG}
          alt="downvote arrow"
          style={{width: "3vw", height: "3vh"}}
          onClick={() => handleDownVotePost(viewing)} 
          data-testid="post-downvote-test" >
        </img>
      </div>
      <img className="favorite-view-svg"
        src={favoriteSVG}
        alt="favorite icon"
        style={{width: "3vw", height: "3vh"}}
        onClick={() => handleFavoritePost(viewingRef)} 
        data-testid="post-favorite-test" >
      </img>
      <div className="close-view-container"
        onClick={() => handleStopViewingPost()}
      >
        <img className="close-view-svg"
          src={closeSVG}
          alt="close view icon" 
          style={{width: "3vw", height: "3vh"}}
          data-testid="post-close-test">
        </img>
        <p className="close-view-text">
          Close
        </p>
      </div>
    </div>
  );
};

export default ViewNav;