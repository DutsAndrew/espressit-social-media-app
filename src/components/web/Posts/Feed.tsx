import React, { FC, useEffect, useState } from "react";
import { FeedProps, Post } from "../../../types/interfaces";
import uniqid from 'uniqid';
import '../../../styles/Feed.css';
import VoteContainer from "./VoteContainer";
import ContentContainer from "./ContentContainer";

const Feed: FC<FeedProps> = (props): JSX.Element => {

  const { user,
    sortedData,
    handleViewPost,
    handleUpVotePost,
    handleDownVotePost,
    handleFavoritePost 
  } = props;

  return (
    <div className="feed-container">
      {Array.isArray(sortedData) && sortedData.map((post) => {
        return <div className="post" key={uniqid()}>
          <VoteContainer 
            user={user}
            post={post}
            whoLiked={post.whoLiked}
            whoDisliked={post.whoDisliked}
            handleUpVotePost={handleUpVotePost}
            handleDownVotePost={handleDownVotePost}
          />
          <ContentContainer
            post={post}
            handleViewPost={handleViewPost}
            handleFavoritePost={handleFavoritePost}
          />
        </div>
      })}
    </div>
  );
}

export default Feed;