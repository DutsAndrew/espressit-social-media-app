import React, { FC } from "react";
import { AddCommentProps, Post } from "../../../types/interfaces";

const AddComment: FC<AddCommentProps> = (props): JSX.Element => {

  const { 
    viewing,
    handleAddCommentToPost 
  } = props;

  // for saving comment to correct post on firebase
  const viewingRef = viewing as Post;

  const validateComment = () => {
    const validationText: Element | null = document.querySelector('.validation-text');

    if (validationText)  {
      validationText.textContent = "Thank you for contributing! :)"
      setTimeout(() => {
        validationText.textContent = "";
      }, 5000);
    };
   
  };

  return (
    <>
      <div className="add-comment-container">
        <textarea className="comment-input"
          placeholder="Add Comment" >
        </textarea>
        <button className="submit-comment-button"
          type="button" 
          onClick={() => validateComment()} >
          Submit Comment
        </button>
      </div>
      <p className="validation-text"></p>
    </>
  );
};

export default AddComment;