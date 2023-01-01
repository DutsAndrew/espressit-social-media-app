import React, { FC } from "react";
import { AddCommentProps, Post } from "../../../types/interfaces";
const Filter = require('bad-words');

const AddComment: FC<AddCommentProps> = (props): JSX.Element => {

  const { 
    viewing,
    handleAddCommentToPost 
  } = props;

  // for saving comment to correct post on firebase
  const viewingRef = viewing as Post;

  const validateComment = (): void => {
    const filter = new Filter();

    let commentText: string = (document.querySelector('.comment-input') as HTMLInputElement).value;
    const validationText: Element | null = document.querySelector('.validation-text');

    if (commentText.trim().length === 0) {
      if (validationText) {
        validationText.textContent = `Your comment must contain characters and not just white space`;
        return;
      };
    };

    if (commentText.length < 1) {
      if (validationText) {
        validationText.textContent = `Your comment was ${commentText.length} character, comments must be at least 1 characters in length`;
        return;
      };
    };

    if (commentText.length > 1000) {
      if (validationText) {
        validationText.textContent = `Your comment was ${commentText.length} characters, comments cannot exceed our 1000 character limit`;
        return;
      };
    };

    const scrubbedText: string = filter.clean(commentText).trim();
    submitComment(scrubbedText);
  };

  const submitComment = (scrubbedText: string): void => {
    const validationText: Element | null = document.querySelector('.validation-text');
    if (validationText)  {
      validationText.textContent = "Thank you for contributing! :)"
      alert(`Your comment: ${scrubbedText}; was saved to our db`);
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