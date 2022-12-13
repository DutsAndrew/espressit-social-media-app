import React, { useEffect, useState } from "react";
import closeItem from '../../../assets/close.svg';
import { postType } from '../../../types/interfaces';
import TextForm from "./TextForm";
import PostNav from "./PostNav";

const CreatePostWeb = (): JSX.Element => {

  const [postData, setPostData] = useState({
    status: false,
    type: '',
  });

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

  const handleInsertImage = () => {
    console.log('allowing image insertion');
  };

  const handleInsertLink = () => {
    console.log('allowing link insertion');
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

  const handleFormSubmission = () => {
    console.log('submitting post');
  };

  if (postData.status === true && postData.type === "text") {
    return (
      <>
        <button className="close-form-button" type="button" onClick={handleCloseForm} ><img className="close-button-svg" src={closeItem} alt="close svg" ></img></button>
        <PostNav handlePostType={handlePostType} />
        <TextForm handleFormSubmission={handleFormSubmission} />
      </>
    );
  };

  if (postData.status === true && postData.type === "img") {
    return (
      <>
        <button className="close-form-button" type="button" onClick={handleCloseForm} ><img className="close-button-svg" src={closeItem} alt="close svg" ></img></button>
        <PostNav handlePostType={handlePostType} />
        <div className="create-post-img-container">
          <input className="insert-image-input" type="file" accept="/image/*" onChange={handleInsertImage} ></input>
        </div>
        <TextForm handleFormSubmission={handleFormSubmission} />
      </>
    );
  };

  if (postData.status === true && postData.type === "link") {
    return (
      <>
        <button className="close-form-button" type="button" onClick={handleCloseForm} ><img className="close-button-svg" src={closeItem} alt="close svg" ></img></button>
        <PostNav handlePostType={handlePostType} />
        <div className="create-post-link-container">
          <input className="insert-link-input" type="url" placeholder="Insert Link here" onChange={handleInsertLink} ></input>
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