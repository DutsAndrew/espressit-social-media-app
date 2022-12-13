import React, { useEffect, useState } from "react";
import imgSVG from '../../../assets/image.svg';
import linkSVG from '../../../assets/link.svg';
import closeItem from '../../../assets/close.svg';
import tamper from '../../../assets/tamper.svg';
import { postType } from '../../../types/interfaces';
import TextForm from "./TextForm";
import PostNav from "./PostNav";

const CreatePostWeb = (): JSX.Element => {

  const [postData, setPostData] = useState({
    status: false,
    type: '',
  });

  const handleCreatePostActivation = (typeOfPost: postType) => {
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
  };

  const handleFormSubmission = () => {
    console.log('submitting post');
  };

  if (postData.status === true && postData.type === "text") {
    return (
      <>
        <button className="close-form-button" type="button" onClick={handleCloseForm} ><img className="close-button-svg" src={closeItem} alt="close svg" ></img></button>
        <PostNav handleCreatePostActivation={handleCreatePostActivation} />
        <TextForm handleFormSubmission={handleFormSubmission} />
      </>
    );
  };

  if (postData.status === true && postData.type === "img") {
    return (
      <>
        <button className="close-form-button" type="button" onClick={handleCloseForm} ><img className="close-button-svg" src={closeItem} alt="close svg" ></img></button>
        <PostNav handleCreatePostActivation={handleCreatePostActivation} />
        <div className="create-post-img-container">
          <input className="insert-image-input" type="file" accept="/image/*" ></input>
          <button type="button" className="insert-image-button" onClick={handleInsertImage} >Insert</button>
        </div>
      </>
    );
  };

  if (postData.status === true && postData.type === "link") {
    return (
      <>
        <button className="close-form-button" type="button" onClick={handleCloseForm} ><img className="close-button-svg" src={closeItem} alt="close svg" ></img></button>
        <PostNav handleCreatePostActivation={handleCreatePostActivation} />
        <div className="create-post-link-container">
          <input className="insert-link-input" type="url" placeholder="Insert Link here" ></input>
          <button type="button" className="insert-link-button" onClick={handleInsertLink} >Insert</button>
        </div>
      </>
    );
  };

  return (
    <PostNav handleCreatePostActivation={handleCreatePostActivation} />
  );
};

export default CreatePostWeb;