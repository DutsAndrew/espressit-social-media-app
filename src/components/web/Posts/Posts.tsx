import React, { useEffect, useState, FC, MouseEventHandler } from "react";
import Feed from "./Feed";
import SortNav from "./SortNav";
import '../../../styles/Posts.css';
import timeSort from "../../../scripts/timeSort";
import ViewPost from "./ViewPost";
import { Post, PostProps, PostData } from "../../../types/interfaces";
import { User } from "firebase/auth";

// firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc } from "firebase/firestore";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const Posts: FC<PostProps> = (props): JSX.Element => {

  const { user } = props;

  // firebaseConfig
  const firebaseConfig = {
    apiKey: "AIzaSyDsPecBa3Ch5uDw4UzHiJWAjKEYOKCrNdA",
    authDomain: "espressit.firebaseapp.com",
    projectId: "espressit",
    storageBucket: "espressit.appspot.com",
    messagingSenderId: "1094129721341",
    appId: "1:1094129721341:web:dc2bdc0a2b322504b04394"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // sort db based on sortType
  // create map function to map sortedData to feed
    // listeners for each post
      // upvote and downvote clicks
      // comment, and favorite clicks
      // comment click will auto trigger viewComment
      // any click on post will send user to viewPost version of post
      // there will be no share click to avoid potential problem with page linking and db query issues

  // sort by new on default
  const [sortType, setSortType] = useState({type: "New"});

  const [sortedData, setSortedData] = useState<PostData>({
    data: [],
  });

  // handles when user wants to view a post
  const [currentlyViewing, setCurrentlyViewing] = useState({
    post: {},
  });

  // fetch all posts from db
  useEffect(() => {
    const dataArray: any[] = [];

    (async function queryDB() {

      const postsQuerySnapshot = await getDocs(collection(db, "posts"));

      postsQuerySnapshot.forEach((doc) => {
        dataArray.push(doc.data());
      });

      setSortedData({
        data: dataArray,
      });

    })();
  }, []);

  const handleSortChange = (type: string): void => {
    setSortType({
      type: type
    });
  };

  

  const handleViewPost = (post: Post): void => {
    setCurrentlyViewing({
      post: post,
    });
  };

  const handleStopViewingPost = (): void => {
    setCurrentlyViewing({
      post: {},
    });
  };

  const handleUpVotePost = (post: Post, e: React.MouseEvent<HTMLImageElement, MouseEvent>): void => {

    // exits upVote if user isn't signed in
    const userRef = user as User;
    if (!userRef.uid) {
      return;
    };

    const dataRef: any[] = sortedData.data;
    const indexRef: number = dataRef.indexOf(post as any);
    let postToChange = dataRef[indexRef];

    // check if user already downvoted, if so, remove downvote and accept upvote
    if (postToChange.whoDisliked.includes(userRef.uid)) {

      const removeUserId = postToChange.whoDisliked.filter((uid: string) => uid !== userRef.uid);
      postToChange.whoDisliked = removeUserId;
      postToChange.likes += 2;
      postToChange.whoLiked.push(userRef.uid);

    } else if (postToChange.whoLiked.includes(userRef.uid)) {

      const removeUserId = postToChange.whoLiked.filter((uid: string) => uid !== userRef.uid);
      postToChange.whoLiked = removeUserId;
      postToChange.likes -= 1;

    } else {

      postToChange.likes += 1;
      postToChange.whoLiked.push(userRef.uid);

    };

    dataRef[indexRef] = postToChange;

    (async function fetchPosts() {
      const postRef = await doc(db, "posts", post.pid);
      await updateDoc(postRef, {
        likes: postToChange.likes,
        whoDisliked: postToChange.whoDisliked,
        whoLiked: [...postToChange.whoLiked],
      });
    })();

    setSortedData({
      data: dataRef,
    });

    return;

  };

  const handleDownVotePost = (post: Post, e: React.MouseEvent<HTMLImageElement, MouseEvent>): void => {

    // exits upVote if user isn't signed in
    const userRef = user as User;
    if (!userRef.uid) {
      return;
    };

    const dataRef: any[] = sortedData.data;
    const indexRef: number = dataRef.indexOf(post as any);
    let postToChange = dataRef[indexRef];

    // check if user already upvoted, if so, remove upvote and accept downvote
    if (postToChange.whoLiked.includes(userRef.uid)) {

      const removeUserId = postToChange.whoLiked.filter((uid: string) => uid !== userRef.uid);
      postToChange.whoLiked = removeUserId;
      postToChange.dislikes += 2;
      postToChange.whoDisliked.push(userRef.uid);

    } else if (postToChange.whoDisliked.includes(userRef.uid)) {

      const removeUserId = postToChange.whoDisliked.filter((uid: string) => uid !== userRef.uid);
      postToChange.whoDisliked = removeUserId;
      postToChange.dislikes -= 1;

    } else {

      postToChange.dislikes += 1;
      postToChange.whoDisliked.push(userRef.uid);

    };

    dataRef[indexRef] = postToChange;

    (async function fetchPosts() {
      const postRef = await doc(db, "posts", post.pid);
      await updateDoc(postRef, {
        dislikes: postToChange.dislikes,
        whoDisliked: [...postToChange.whoDisliked],
        whoLiked: postToChange.whoLiked,
      });
    })();

    setSortedData({
      data: dataRef,
    });

    return;

  };

  const handleFavoritePost = (post: Post) => {
    // will take in the post data as an an argument, save to db under users favoritePosts array
    // ADD VALIDAITON TO PREVENT DUPLICATE FAVORITING
    console.log('favoriting post', post);
  };

  const handleUpVoteComment = (comment: Object): void => {

    // NEED TO ADD USER TO WHOLIKED ARRAY TO PREVENT DUPLICATE LIKE

    const dataRef = sortedData.data;
    const postIndexRef = dataRef.indexOf(currentlyViewing.post as any);

    let postToChange = dataRef[postIndexRef];
    const commentIndexRef = postToChange.comments.indexOf(comment as any)
    
    let commentToChange = postToChange.comments[commentIndexRef];
    commentToChange.likes += 1;

    postToChange.comments[commentIndexRef] = commentToChange;
    dataRef[postIndexRef] = postToChange;

    setSortedData({
      data: dataRef,
    });
  };

  const handleDownVoteComment = (comment: Object): void => {

    // NEED TO ADD USER TO WHODISLIKED ARRAY TO PREVENT DUPLICATE DISLIKE

    const dataRef = sortedData.data;
    const postIndexRef = dataRef.indexOf(currentlyViewing.post as any);

    let postToChange = dataRef[postIndexRef];
    const commentIndexRef = postToChange.comments.indexOf(comment as any)
    
    let commentToChange = postToChange.comments[commentIndexRef];
    commentToChange.likes -= 1;

    postToChange.comments[commentIndexRef] = commentToChange;
    dataRef[postIndexRef] = postToChange;

    setSortedData({
      data: dataRef,
    });
  };
 
  // (function fakeDates () {
  //   const dateArray: any[] = [];
  //   const date1: any = new Date().toLocaleString();
  
  //   dateArray.push(date1);

  //   setTimeout(() => {
  //     const date2 = new Date().toLocaleString();
  //     dateArray.push(date2);
  //   }, 1000);

  //   const date3 = new Date(1995, 8, 17, 3, 24, 10).toLocaleString();
  //   const date4 = new Date(2022, 10, 3, 10, 3, 8).toLocaleString();
  //   dateArray.push(date3, date4);

  //   const results = timeSort(dateArray);
  // })();

  // useEffect(() => {
  //   console.log(currentlyViewing);
  // }, [currentlyViewing]);

  // if a post isn't being viewed return feed
  if (Object.keys(currentlyViewing.post).length === 0) {
    return (
      <div className="posts-container" >
        <SortNav 
          handleSortChange={handleSortChange}
          sortType={sortType}
        />
        <Feed 
          user={user}
          sortedData={sortedData.data}
          handleViewPost={handleViewPost}
          handleUpVotePost={handleUpVotePost}
          handleDownVotePost={handleDownVotePost}
          handleFavoritePost={handleFavoritePost}
        />
      </div>
    );
  } else {
    return (
      <ViewPost 
        viewing={currentlyViewing.post}
        handleUpVotePost={handleUpVotePost}
        handleDownVotePost={handleDownVotePost}
        handleStopViewingPost={handleStopViewingPost}
        handleUpVoteComment={handleUpVoteComment}
        handleDownVoteComment={handleDownVoteComment}
        handleFavoritePost={handleFavoritePost}
      />
    );
  };
};

export default Posts;