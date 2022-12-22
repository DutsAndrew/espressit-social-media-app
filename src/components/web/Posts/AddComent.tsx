import React, { FC } from "react";
import { AddCommentProps } from "../../../types/interfaces";

const AddComment: FC<AddCommentProps> = (props): JSX.Element => {

  const { handleAddCommentToPost } = props;

  const validateComment = () => {
    const validationText: Element | null = document.querySelector('.validation-text');
    if (validationText) validationText.textContent = "Thank you for contributing! :)";
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