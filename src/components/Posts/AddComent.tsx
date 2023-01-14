import React, { FC } from "react";
import { AddCommentProps, Post } from "../../types/interfaces";
import '../../styles/Posts/AddComment.css';
const Filter = require('bad-words');

const AddComment: FC<AddCommentProps> = (props): JSX.Element => {

  const { 
    user,
    viewing,
    handleAddCommentToPost 
  } = props;

  // for saving comment to correct post on firebase
  const viewingRef = viewing as Post;

  const validateComment = (): void => {

    if (typeof user === 'string') {
      alert('only signed in users can leave comments :)');
      return;
    };

    const filter = new Filter(),
          validationText: Element | null = document.querySelector('#validation-text');

    let commentText: string = (document.querySelector('.comment-input') as HTMLInputElement).value;

    if (commentText.trim().length === 0) {

      if (validationText) {
        validationText.textContent = `Your comment must contain characters and not just white space`;
        validationText.classList.add('text-not-authenticated');

        setTimeout(() => {
          if (validationText) {
            validationText.textContent = "";
            validationText.className = "";
          };
        }, 5000);

        return;
      };

    };

    if (commentText.length < 2) {

      if (validationText) {
        validationText.textContent = `Your comment was ${commentText.length} character, comments must be at least 2 characters in length`;
        validationText.classList.add('text-not-authenticated');

        setTimeout(() => {
          if (validationText) {
            validationText.textContent = "";
            validationText.className = "";
          };
        }, 5000);

        return;
      };

    };

    if (commentText.length > 1000) {

      if (validationText) {
        validationText.textContent = `Your comment was ${commentText.length} characters, comments cannot exceed our 1000 character limit`;
        validationText.classList.add('text-not-authenticated');

        setTimeout(() => {
          if (validationText) {
            validationText.textContent = "";
            validationText.className = "";
          };
        }, 5000);

        return;
      };

    };

    const scrubbedText: string = filter.clean(commentText).trim();
    submitComment(scrubbedText);
  };

  const submitComment = (scrubbedText: string): void => {

    const validationText: Element | null = document.querySelector('#validation-text');

    if (validationText)  {
      validationText.textContent = "Thank you for contributing! :); your comment was saved.";
      validationText.classList.add('text-authenticated');

      setTimeout(() => {
        validationText.textContent = "";
        validationText.className = "";
      }, 5000);

    };

    handleAddCommentToPost(scrubbedText);

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
      <p id="validation-text"></p>
    </>
  );
};

export default AddComment;