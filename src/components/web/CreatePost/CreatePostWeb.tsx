import React, { useEffect, useState, FC } from "react";
import closeItem from '../../../assets/close.svg';
import { CreatePostProps, postType } from '../../../types/interfaces';
import TextForm from "./TextForm";
import PostNav from "./PostNav";
import uniqid from 'uniqid';
import { User } from "firebase/auth";
import { doc, setDoc, updateDoc, getFirestore, Firestore, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const CreatePostWeb: FC<CreatePostProps> = (props): JSX.Element => {

  const { user } = props;

  const [postData, setPostData] = useState({
    status: false,
    type: '',
  });

  const [selectedFile, setSelectedFile] = useState();

  const handlePostType = (typeOfPost: postType) => {
    // helps render the correct post type
    if (typeOfPost.text) {
      setPostData({
        status: true,
        type: "text",
      });
    } else if (typeOfPost.img) {
      setPostData({
        status: true,
        type: "img",
      });
    } else if (typeOfPost.link) {
      setPostData({
        status: true,
        type: "link",
      });
    };
  };

  const handleCloseForm = () => {
    setPostData({
      status: false,
      type: '',
    });
  };

  const handleInsertImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) setSelectedFile((e.target.files as any)[0]);
  };

  const handleInsertLink = () => {
    const input = document.querySelector('.insert-link-input') as HTMLInputElement;
    const errorText = document.querySelector('.error-text-post-input');

    // handles error text production and removal
    if (input.validity.valid === false) {
     if (errorText) {
      errorText.textContent = "Your link must have: 1) https:// 2) URL 3) .com, .net, .org, or other website ending";
      setTimeout(() => {
        errorText.textContent = "";
      }, 10000);
     };
    };
  };

  const handleFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {

    e.preventDefault();

    const userRef = (user as User);

    //firebase config
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
    const storage = getStorage(app);

    const titleOfPost: string | null = (document.querySelector('.create-post-text-input') as HTMLInputElement).value;
    const bodyOfPost: string | null = (document.querySelector('#text-body-input') as HTMLInputElement).value;

    if (postData.type === "text") {
      createPostTypeText(userRef, db, titleOfPost, bodyOfPost);
    };

    if (postData.type === "img") {
      createPostTypeImg(userRef, db, titleOfPost, bodyOfPost);
    };

    if (postData.type === "link") {
      const linkOfPost: string | null = (document.querySelector('.insert-link-input') as HTMLInputElement).value;
      createPostTypeLink(userRef, db, titleOfPost, bodyOfPost, linkOfPost);
    };

  };

  const createPostTypeText = async (userRef: User, db: Firestore, titleOfPost: string, bodyOfPost: string): Promise<void> => {

    const id = uniqid();

    const userInstanceRef = doc(db, "users", userRef.uid);
    const getUserInstanceSnap = await getDoc(userInstanceRef);

    if (getUserInstanceSnap.exists()) {

      const post = {
        account: getUserInstanceSnap.data().username,
        author: userRef.uid,
        body: bodyOfPost,
        comments: [],
        dislikes: 0,
        imgURL: '',
        imgURLRef: '',
        likes: 1,
        link: '',
        pid: id,
        time: new Date().toLocaleString(),
        title: titleOfPost,
        views: 0,
        whoDisliked: [],
        whoLiked: [],
      };

      await updateDoc(userInstanceRef, {
        posts: [...getUserInstanceSnap.data().posts, post],
      });
      await setDoc(doc(db, "posts", id), {
        post,
      });
    };

  };

  const createPostTypeImg = async (userRef: User, db: Firestore, titleOfPost: string, bodyOfPost: string): Promise<void> => {

    const id = uniqid();

    const storage = getStorage();
    const storageRef = ref(storage, `postImgs/${(selectedFile as any).name}`);

    if (selectedFile !== undefined) {

      uploadBytes(storageRef, selectedFile)
        .then((snapshot) => {
          // image has been uploaded to the db
          // download url for uploaded image
        })
        .catch(() => {
          alert('your image was not uploaded to the server so we cancelled the post upload, please try again later');
          return;
        });

        getDownloadURL(ref(storage, `images/${(selectedFile as any).name}`))
          .then((url) => {
            // `url` is the download URL for 'images/${selectedFile.name}'
            // save url and storageRef to post

            (async function setPostDataWithImgURL() {

              const userInstanceRef = doc(db, "users", userRef.uid);
              const getUserInstanceSnap = await getDoc(userInstanceRef);
  
              if (getUserInstanceSnap.exists()) {

                const post = {
                  account: userRef.uid,
                  author: getUserInstanceSnap.data().username,
                  body: bodyOfPost,
                  comments: [],
                  dislikes: 0,
                  imgURL: url,
                  imgURLRef: `images/${(selectedFile as any).name}`,
                  likes: 1,
                  link: '',
                  pid: id,
                  time: new Date().toLocaleString(),
                  title: titleOfPost,
                  views: 0,
                  whoDisliked: [],
                  whoLiked: [],
                };

                await updateDoc(userInstanceRef, {
                  posts: [...getUserInstanceSnap.data().posts, post],
                });
                await setDoc(doc(db, "posts", id), {
                  post,
                });
              };

            })();

          })
          .catch((error) => {
            alert('We were not able to attach the picture you uploaded to your post, please try again later');
            deleteObject(storageRef)
              .then(() => {
                // File deleted successfully
              })
              .catch((error) => {
                alert('We were not able to delete the picture you uploaded and it is not connected to anything, please reach out to dutsandrew@gmail.com if you see this message');
                return;
              });
          });
    };

  };

  const createPostTypeLink = async (userRef: User, db: Firestore, titleOfPost: string, bodyOfPost: string, linkOfPost: string): Promise<void> => {

    const id = uniqid();

    const userInstanceRef = doc(db, "users", userRef.uid);
    const getUserInstanceSnap = await getDoc(userInstanceRef);

    if (getUserInstanceSnap.exists()) {

      const post = {
        account: getUserInstanceSnap.data().username,
        author: userRef.uid,
        body: bodyOfPost,
        comments: [],
        dislikes: 0,
        imgURL: '',
        imgURLRef: '',
        likes: 1,
        link: linkOfPost,
        pid: id,
        time: new Date().toLocaleString(),
        title: titleOfPost,
        views: 0,
        whoDisliked: [],
        whoLiked: [],
      };

      await updateDoc(userInstanceRef, {
        posts: [...getUserInstanceSnap.data().posts, post],
      });
      await setDoc(doc(db, "posts", id), {
        post,
      });
    };

  };

  if (postData.status === true && postData.type === "text") {
    return (
      <>
        <button className="close-form-button"
          type="button"
          onClick={handleCloseForm} >
          <img className="close-button-svg"
            src={closeItem}
            alt="close svg" >
          </img>
        </button>
        <PostNav handlePostType={handlePostType} />
        <TextForm handleFormSubmission={handleFormSubmission} />
      </>
    );
  };

  if (postData.status === true && postData.type === "img") {
    return (
      <>
        <button className="close-form-button"
          type="button"
          onClick={handleCloseForm} >
          <img className="close-button-svg"
            src={closeItem}
            alt="close svg" >
          </img>
        </button>
        <PostNav handlePostType={handlePostType} />
        <div className="create-post-img-container">
          <input className="insert-image-input"
            type="file"
            accept="/image/*"
            onChange={(e) => handleInsertImage(e)} >
          </input>
        </div>
        <TextForm handleFormSubmission={handleFormSubmission} />
      </>
    );
  };

  if (postData.status === true && postData.type === "link") {
    return (
      <>
        <button className="close-form-button"
          type="button"
          onClick={handleCloseForm} >
          <img className="close-button-svg"
            src={closeItem}
            alt="close svg" >
          </img>
        </button>
        <PostNav handlePostType={handlePostType} />
        <div className="create-post-link-container">
          <input className="insert-link-input"
            type="url"
            placeholder="Insert Link here"
            onChange={handleInsertLink} >
          </input>
        </div>
        <p className="error-text-post-input"></p>
        <TextForm handleFormSubmission={handleFormSubmission} />
      </>
    );
  };

  return (
    <PostNav handlePostType={handlePostType} />
  );
};

export default CreatePostWeb;