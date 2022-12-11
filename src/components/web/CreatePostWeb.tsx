import React, { useState } from "react";
import imgSVG from '../../assets/image.svg';
import linkSVG from '../../assets/link.svg';
import closeItem from '../../assets/close.svg';
import tamper from '../../assets/tamper.svg';

const CreatePostWeb = (): JSX.Element => {

  const [isPostOpen, setIsPostOpen] = useState({status: false});

  const handleCreatePostActivation = () => {
    if (isPostOpen.status === true) {
      return;
    };

    setIsPostOpen({
      status: true,
    });
  };

  const handleCloseForm = () => {
    setIsPostOpen({
      status: false,
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

  if (isPostOpen.status === false) {
    return (
      <div className="create-post-container" onClick={handleCreatePostActivation} >
        <img className="create-post-tamper-img" src={tamper} alt="profile"></img>
        <input className="create-post-text-input" placeholder="Create Post" onFocus={handleCreatePostActivation} ></input>
        <button type="button" className="create-post-insert-img"><img className="create-post-svg" src={imgSVG} alt="icon" onClick={handleCreatePostActivation} ></img></button>
        <button type="button" className="create-post-insert-link"><img className="create-post-svg" src={linkSVG} alt="icon" onClick={handleCreatePostActivation} ></img></button>
      </div>
    );
  };

  if (isPostOpen.status === true) {
    return (
      <>
        <button className="close-form-button" type="button" onClick={handleCloseForm} ><img className="close-button-svg" src={closeItem} alt="close svg" ></img></button>
        <div className="create-post-container" >
          <img className="create-post-tamper-img" src={tamper} alt="profile"></img>
          <input className="create-post-text-input" placeholder="Title" ></input>
          <button type="button" className="create-post-insert-img"><img className="create-post-svg" src={imgSVG} alt="icon" onClick={handleInsertImage} ></img></button>
          <button type="button" className="create-post-insert-link"><img className="create-post-svg" src={linkSVG} alt="icon" onClick={handleInsertLink} ></img></button>
        </div>
        <div className="create-post-extended-container">
          <form className="create-post-form" onSubmit={handleFormSubmission}>
            <fieldset className="create-post-fieldset">
              <label htmlFor="text-body-input" className="text-body-label">Paint the picture for us:</label>
              <textarea id="text-body-input" className="text-body-input" placeholder="So there I was... Fighting the spiders" ></textarea>
              <button className="post-submit-button" type="submit">Post</button>
            </fieldset>
          </form>
        </div>
      </>
    );
  };

  return (
    <p>Error, please try again</p>
  );
};

export default CreatePostWeb;