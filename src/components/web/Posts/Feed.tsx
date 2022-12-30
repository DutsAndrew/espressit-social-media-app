import React, { FC, useEffect, useState } from "react";
import { FeedProps, Post } from "../../../types/interfaces";
import upVoteSVG from '../../../assets/arrow-up.svg';
import downVoteSVG from '../../../assets/arrow-down.svg';
import favoriteSVG from '../../../assets/save.svg';
import commentSVG from '../../../assets/comment.svg';
import uniqid from 'uniqid';
import '../../../styles/Feed.css';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import LoadingBar from "./LoadingBar";

const Feed: FC<FeedProps> = (props): JSX.Element => {

  const { sortedData, handleViewPost, handleUpVotePost, handleDownVotePost, handleFavoritePost } = props;

  const [loadingBar, setLoadingBar] = useState({
    active: false,
  });

  const [imgRetrieved, setImgRetrieved] = useState({
    status: false,
  });

  const callHandleViewPost = (post: Post): void => {
    handleViewPost(post);
  };

  const callHandleFavoritePost = (post: Post): void => {
    handleFavoritePost(post);
  };

  // fetch img if post has img ref
  useEffect(() => {
    (function fetchImgFromCloudStore() {
      const dataRef = sortedData as any;
      dataRef.forEach((post: any): void => {
        if (post.img.length !== 0) {
          setLoadingBar({
            active: true,
          });
          const storage = getStorage();
          getDownloadURL(ref(storage, post.img))
            .then((url) => {
              setImgRetrieved({
                status: true,
              });
              post.img = url;
              return;
            })
            .catch((error) => {
              console.log(error);
              return;
            });
          };
      });
    })();
  }, []);

  if (imgRetrieved.status === false && loadingBar.active === true) {
    return (
      <LoadingBar />
    );
  };


  return (
    <div className="feed-container">
      {Array.isArray(sortedData) && sortedData.map((post) => {

        if (post.img.length === 0 && post.link.length === 0) {

          return <div className="post" key={uniqid()}>
            <div className="upvote-downvote-container">
              <img className="upvote-svg"
                src={upVoteSVG}
                alt="upvote arrow"
                style={{width: "3vw", height: "3vh"}}
                onClick={() => handleUpVotePost(post)} >
              </img>
              <p className="upvote-count-text">
                {(post.likes - post.dislikes) > 0 ? post.likes - post.dislikes : 0}
              </p>
              <img className="downvote-svg"
                src={downVoteSVG}
                alt="downvote arrow"
                style={{width: "3vw", height: "3vh"}}
                onClick={() => handleDownVotePost(post)} >
              </img>
            </div>
            <div className="content-container">
              <h1 className="post-title"
                onClick={() => callHandleViewPost(post)} >
                {post.title.length > 75 ? post.title.slice(0, 75).concat('...') : post.title}
              </h1>
              <h3 className="post-description"
                onClick={() => callHandleViewPost(post)} >
                {post.body.length > 400 ? post.body.slice(0, 400).concat('...') : post.body}
              </h3>
              <div className="post-footer-container">
                <img className="post-comment-svg"
                  src={commentSVG}
                  alt="comment box"
                  style={{width: "2vw", height: "2vh"}}
                  onClick={() => callHandleViewPost(post)} >
                </img>
                <p className="post-comment-amount">{post.comments.length}</p>
                <img className="post-favorite-svg"
                  src={favoriteSVG}
                  alt="save icon"
                  style={{width: "2vw", height: "2vh"}}
                  onClick={() => callHandleFavoritePost(post)} >
                </img>
              </div>
            </div>
          </div>

        } else if (post.link.length !== 0 && post.img.length === 0) {

          return <div className="post" key={uniqid()}>
            <div className="upvote-downvote-container">
              <img className="upvote-svg"
                src={upVoteSVG}
                alt="upvote arrow"
                style={{width: "3vw", height: "3vh"}}
                onClick={() => handleUpVotePost(post)} >
              </img>
              <p className="upvote-count-text">
                {(post.likes - post.dislikes) > 0 ? post.likes - post.dislikes : 0}
              </p>
              <img className="downvote-svg"
                src={downVoteSVG}
                alt="downvote arrow"
                style={{width: "3vw", height: "3vh"}}
                onClick={() => handleDownVotePost(post)} >
              </img>
            </div>
            <div className="content-container">
              <h1 className="post-title"
                onClick={() => callHandleViewPost(post)} >
                {post.title.length > 75 ? post.title.slice(0, 75).concat('...') : post.title}
              </h1>
              <h3 className="post-description"
                onClick={() => callHandleViewPost(post)} >
                {post.body.length > 400 ? post.body.slice(0, 400).concat('...') : post.body}
              </h3>
              <a className="post-link"
                href={post.link} >
              </a>
              <div className="post-footer-container">
                <img className="post-comment-svg"
                  src={commentSVG} 
                  alt="comment box" 
                  style={{width: "2vw", height: "2vh"}}
                  onClick={() => callHandleViewPost(post)} >
                </img>
                <p className="post-comment-amount">{post.comments.length}</p>
                <img className="post-favorite-svg"
                  src={favoriteSVG}
                  alt="save icon"
                  style={{width: "2vw", height: "2vh"}}
                  onClick={() => callHandleFavoritePost(post)} >
                </img>
              </div>
            </div>
          </div>

        } else if (post.link.length === 0 && post.img.length !== 0) {

          return <div className="post" key={uniqid()}>
            <div className="upvote-downvote-container">
              <img className="upvote-svg"
                src={upVoteSVG}
                alt="upvote arrow"
                style={{width: "3vw", height: "3vh"}}
                onClick={() => handleUpVotePost(post)} >
              </img>
              <p className="upvote-count-text">
                {(post.likes - post.dislikes) > 0 ? post.likes - post.dislikes : 0}
              </p>
              <img className="downvote-svg"
                src={downVoteSVG}
                alt="downvote arrow"
                style={{width: "3vw", height: "3vh"}}
                onClick={() => handleDownVotePost(post)} >
              </img>
            </div>
            <div className="content-container">
              <h1 className="post-title"
                onClick={() => callHandleViewPost(post)} >
                {post.title.length > 75 ? post.title.slice(0, 75).concat('...') : post.title}
              </h1>
              <img className="post-img"
                src={post.img}
                alt="user post" >
              </img>
              <h3 className="post-description"
                onClick={() => callHandleViewPost(post)} >
                {post.body.length > 400 ? post.body.slice(0, 400).concat('...') : post.body}
              </h3>
              <div className="post-footer-container">
                <img className="post-comment-svg"
                  src={commentSVG}
                  alt="comment box"
                  style={{width: "2vw", height: "2vh"}}
                  onClick={() => callHandleViewPost(post)} >
                </img>
                <p className="post-comment-amount">{post.comments.length}</p>
                <img className="post-favorite-svg"
                  src={favoriteSVG}
                  alt="save icon"
                  style={{width: "2vw", height: "2vh"}}
                  onClick={() => callHandleFavoritePost(post)} >
                </img>
              </div>
            </div>
          </div>

        } else if (post.link.length !== 0 && post.img.length !== 0) {

          return <div className="post" key={uniqid()}>
            <div className="upvote-downvote-container">
              <img className="upvote-svg"
                src={upVoteSVG}
                alt="upvote arrow"
                style={{width: "3vw", height: "3vh"}}
                onClick={() => handleUpVotePost(post)} >
              </img>
              <p className="upvote-count-text">
                {(post.likes - post.dislikes) > 0 ? post.likes - post.dislikes : 0}
              </p>
              <img className="downvote-svg"
                src={downVoteSVG}
                alt="downvote arrow"
                style={{width: "3vw", height: "3vh"}}
                onClick={() => handleDownVotePost(post)} >
              </img>
            </div>
            <div className="content-container">
              <h1 className="post-title"
                onClick={() => callHandleViewPost(post)} >
                {post.title.length > 75 ? post.title.slice(0, 75).concat('...') : post.title}
              </h1>
              <img className="post-img"
                src={post.img}
                alt="user post" >
              </img>
              <h3 className="post-description"
                onClick={() => callHandleViewPost(post)} >
                {post.body.length > 400 ? post.body.slice(0, 400).concat('...') : post.body}
              </h3>
              <a className="post-link"
                href={post.link} >
              </a>
              <div className="post-footer-container">
                <img className="post-comment-svg"
                  src={commentSVG}
                  alt="comment box"
                  style={{width: "2vw", height: "2vh"}}
                  onClick={() => callHandleViewPost(post)} >
                </img>
                <p className="post-comment-amount">{post.comments.length}</p>
                <img className="post-favorite-svg"
                  src={favoriteSVG}
                  alt="save icon"
                  style={{width: "2vw", height: "2vh"}}
                  onClick={() => callHandleFavoritePost(post)} >
                </img>
              </div>
            </div>
          </div>

        } else {
          return (
            <p>Error, something went wrong and we don't know what</p>
          );
        };
      })}
    </div>
  );
};

export default Feed;