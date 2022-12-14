import React, { useEffect, useState, FC, lazy, Suspense } from "react";
import Feed from "./Feed";
import SortNav from "./SortNav";
import LoadingBar from "../LoadingBar";
import '../../styles/Posts/Posts.css';
import timeSort from "../../scripts/timeSort";
import { Post, PostProps, PostData } from "../../types/interfaces";
import { User } from "firebase/auth";

// firebase imports
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

// lazy load for anything that isn't needed on first load
const ViewPost = lazy(() => import('./ViewPost'));

const Posts: FC<PostProps> = (props): JSX.Element => {

  const { user, newPostStatus, newPostFetched } = props;

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

  // grab new post from db
  useEffect(() => {
    if (newPostStatus === true) {
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

      newPostFetched();
    };
  }, [newPostStatus]);

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

  const handleUpVotePost = (post: Post): void => {

    // exits upVote if user isn't signed in
    const userRef = user as User;
    if (!userRef.uid) {
      alert('you need to be signed in to interact with this');
      return;
    };

    const dataRef: any[] = sortedData.data;
    const indexRef: number = dataRef.indexOf(post as any);
    let postToChange = dataRef[indexRef];

    // check if user already downvoted, if so, remove downvote and accept upvote
    if (postToChange.whoDisliked.includes(userRef.uid)) {
      const removeUserId = postToChange.whoDisliked.filter((uid: string) => uid !== userRef.uid);
      postToChange.whoDisliked = removeUserId;
      postToChange.likes += 1;
      postToChange.dislikes -= 1;
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

    (async function updatePost() {
      const postRef = await doc(db, "posts", post.pid);
      await updateDoc(postRef, {
        dislikes: postToChange.dislikes,
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

  const handleDownVotePost = (post: Post): void => {

    // exits upVote if user isn't signed in
    const userRef = user as User;
    if (!userRef.uid) {
      alert('you need to be signed in to interact with this');
      return;
    };

    const dataRef: any[] = sortedData.data;
    const indexRef: number = dataRef.indexOf(post as any);
    let postToChange = dataRef[indexRef];

    // check if user already upvoted, if so, remove upvote and accept downvote
    if (postToChange.whoLiked.includes(userRef.uid)) {
      const removeUserId = postToChange.whoLiked.filter((uid: string) => uid !== userRef.uid);
      postToChange.whoLiked = removeUserId;
      postToChange.dislikes += 1;
      postToChange.likes -= 1;
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

    (async function updatePost() {
      const postRef = await doc(db, "posts", post.pid);
      await updateDoc(postRef, {
        dislikes: postToChange.dislikes,
        likes: postToChange.likes,
        whoDisliked: [...postToChange.whoDisliked],
        whoLiked: postToChange.whoLiked,
      });
    })();

    setSortedData({
      data: dataRef,
    });

    return;

  };

  const handleFavoritePost = async (post: Post): Promise<void> => {

    const userRef = user as User;

    if (!userRef.uid) {
      alert('you need to be signed in to interact with this');
      return;
    };
    
    const userInstanceRef = doc(db, "users", userRef.uid);
    const userInstanceSnap = await getDoc(userInstanceRef);

    if (userInstanceSnap.exists()) {
      const favorites = userInstanceSnap.data().favoritePosts;
      const isItFavorited = favorites.find((favorite: Post) => favorite.pid === post.pid);

      if (isItFavorited !== undefined) {
        // the item is already favorited
        alert('looks like you already favorited this post, we\'re aborting this action');
        return;
      };

      if (isItFavorited === undefined) {
        await updateDoc(userInstanceRef, {
          favoritePosts: [...favorites, post],
        });
      };

    } else {
      alert('we could not retrieve your favorites at this time, please try again later');
    };
  };

  const handleUpVoteComment = (post: Post, comment: Object): void => {

    const userRef = user as User;
    if (!userRef.uid) {
      alert('you need to be signed in to interact with this');
      return;
    };

    const dataRef = sortedData.data;

    const postIndexRef = dataRef.indexOf(currentlyViewing.post as any);
    let postToChange = dataRef[postIndexRef];

    const commentIndexRef = postToChange.comments.indexOf(comment as any)
    let commentToChange = postToChange.comments[commentIndexRef];

    if (commentToChange.whoDisliked.includes(userRef.uid)) {
      const removeUserId = commentToChange.whoDisliked.filter((uid: string) => uid !== userRef.uid);
      commentToChange.whoDisliked = removeUserId;
      commentToChange.likes += 1;
      commentToChange.dislikes -= 1;
      commentToChange.whoLiked.push(userRef.uid);
    } else if (commentToChange.whoLiked.includes(userRef.uid)) {
      const removeUserId = commentToChange.whoLiked.filter((uid: string) => uid !== userRef.uid);
      commentToChange.whoLiked = removeUserId;
      commentToChange.likes -= 1;
    } else {
      commentToChange.likes += 1;
      commentToChange.whoLiked.push(userRef.uid);
    };

    postToChange.comments[commentIndexRef] = commentToChange;
    dataRef[postIndexRef] = postToChange;

    (async function updateComment() {
      const postRef = await doc(db, "posts", post.pid);
      await updateDoc(postRef, {
        comments: postToChange.comments,
      });
    })();

    setSortedData({
      data: dataRef,
    });
  };

  const handleDownVoteComment = (post: Post, comment: Object): void => {

    const userRef = user as User;
    if (!userRef.uid) {
      alert('you need to be signed in to interact with this');
      return;
    };

    const dataRef = sortedData.data;

    const postIndexRef = dataRef.indexOf(currentlyViewing.post as any);
    let postToChange = dataRef[postIndexRef];

    const commentIndexRef = postToChange.comments.indexOf(comment as any)
    let commentToChange = postToChange.comments[commentIndexRef];

    if (commentToChange.whoLiked.includes(userRef.uid)) {
      const removeUserId = commentToChange.whoLiked.filter((uid: string) => uid !== userRef.uid);
      commentToChange.whoLiked = removeUserId;
      commentToChange.dislikes += 1;
      commentToChange.likes -= 1;
      commentToChange.whoDisliked.push(userRef.uid);
    } else if (commentToChange.whoDisliked.includes(userRef.uid)) {
      const removeUserId = commentToChange.whoDisliked.filter((uid: string) => uid !== userRef.uid);
      commentToChange.whoDisliked = removeUserId;
      commentToChange.dislikes -= 1;
    } else {
      commentToChange.dislikes += 1;
      commentToChange.whoDisliked.push(userRef.uid);
    };

    postToChange.comments[commentIndexRef] = commentToChange;
    dataRef[postIndexRef] = postToChange;

    (async function updateComment() {
      const postRef = await doc(db, "posts", post.pid);
      await updateDoc(postRef, {
        comments: postToChange.comments,
      });
    })();

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
  //   console.log(date1, results);
  // })();

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
      <Suspense fallback={<LoadingBar/>}>
        <ViewPost 
          user={user}
          viewing={currentlyViewing.post}
          handleUpVotePost={handleUpVotePost}
          handleDownVotePost={handleDownVotePost}
          handleStopViewingPost={handleStopViewingPost}
          handleUpVoteComment={handleUpVoteComment}
          handleDownVoteComment={handleDownVoteComment}
          handleFavoritePost={handleFavoritePost}
        />
      </Suspense>
    );
  };
};

export default Posts;