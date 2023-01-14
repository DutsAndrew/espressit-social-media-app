import React, { FC } from "react";
import favoriteSVG from '../../assets/save.svg';
import closeSVG from '../../assets/close.svg';
import upVoteSVG from '../../assets/arrow-up.svg';
import downVoteSVG from '../../assets/arrow-down.svg';
import { ViewNavProps } from "../../types/interfaces";
import { Post } from "../../types/interfaces";
import { User } from "firebase/auth";
import '../../styles/Posts/ViewNav.css';

const ViewNav: FC<ViewNavProps> = (props): JSX.Element => {

  const { 
    user,
    viewing,
    handleUpVotePost,
    handleDownVotePost,
    handleFavoritePost,
    handleStopViewingPost 
  } = props;

  const viewingRef = viewing as Post,
        userRef = user as User;

  if (viewingRef.whoLiked.includes(userRef.uid)) {
    return (
      <div className="view-nav-container">
        <div className="upvote-downvote-view-container">
          <img 
            id="svg-upvote"
            className="upvote-svg"
            src={upVoteSVG}
            alt="upvote arrow"
            onClick={() => handleUpVotePost(viewing)} 
            data-testid="post-upvote-test" >
          </img>
          <p className="vote-counter-text">
            {(viewingRef.likes - viewingRef.dislikes) > 0 ? viewingRef.likes - viewingRef.dislikes : 0}
          </p>
          <img 
            id="svg-downvote"
            className="not-downvoted"
            src={downVoteSVG}
            alt="downvote arrow"
            onClick={() => handleDownVotePost(viewing)} 
            data-testid="post-downvote-test" >
          </img>
        </div>
        <img className="favorite-view-svg"
          src={favoriteSVG}
          alt="favorite icon"
          onClick={() => handleFavoritePost(viewingRef)} 
          data-testid="post-favorite-test" >
        </img>
        <div className="close-view-container"
          onClick={() => handleStopViewingPost()}
        >
          <img className="close-view-svg"
            src={closeSVG}
            alt="close view icon" 
            data-testid="post-close-test">
          </img>
          <p className="close-view-text">
            Close
          </p>
        </div>
      </div>
    );
  };

  if (viewingRef.whoDisliked.includes(userRef.uid)) {
   return (
    <div className="view-nav-container">
      <div className="upvote-downvote-view-container">
        <img 
          id="svg-upvote"
          className="not-upvoted"
          src={upVoteSVG}
          alt="upvote arrow"
          onClick={() => handleUpVotePost(viewing)} 
          data-testid="post-upvote-test" >
        </img>
        <p className="vote-counter-text">
          {(viewingRef.likes - viewingRef.dislikes) > 0 ? viewingRef.likes - viewingRef.dislikes : 0}
        </p>
        <img 
          id="svg-downvote"
          className="downvote-svg"
          src={downVoteSVG}
          alt="downvote arrow"
          onClick={() => handleDownVotePost(viewing)} 
          data-testid="post-downvote-test" >
        </img>
      </div>
      <img className="favorite-view-svg"
        src={favoriteSVG}
        alt="favorite icon"
        onClick={() => handleFavoritePost(viewingRef)} 
        data-testid="post-favorite-test" >
      </img>
      <div className="close-view-container"
        onClick={() => handleStopViewingPost()}
      >
        <img className="close-view-svg"
          src={closeSVG}
          alt="close view icon" 
          data-testid="post-close-test">
        </img>
        <p className="close-view-text">
          Close
        </p>
      </div>
    </div>
   );
  };

  return (
    <div className="view-nav-container">
      <div className="upvote-downvote-view-container">
        <img 
          id="svg-upvote"
          className="upvote-svg"
          src={upVoteSVG}
          alt="upvote arrow"
          onClick={() => handleUpVotePost(viewing)} 
          data-testid="post-upvote-test" >
        </img>
        <p className="vote-counter-text">
          {(viewingRef.likes - viewingRef.dislikes) > 0 ? viewingRef.likes - viewingRef.dislikes : 0}
        </p>
        <img 
          id="svg-downvote"
          className="downvote-svg"
          src={downVoteSVG}
          alt="downvote arrow"
          onClick={() => handleDownVotePost(viewing)} 
          data-testid="post-downvote-test" >
        </img>
      </div>
      <img className="favorite-view-svg"
        src={favoriteSVG}
        alt="favorite icon"
        onClick={() => handleFavoritePost(viewingRef)} 
        data-testid="post-favorite-test" >
      </img>
      <div className="close-view-container"
        onClick={() => handleStopViewingPost()}
      >
        <img className="close-view-svg"
          src={closeSVG}
          alt="close view icon" 
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