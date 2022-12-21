import React, { FC } from "react";
import { TextFormProps } from '../../../types/interfaces';

const TextForm: FC<TextFormProps> = (props): JSX.Element => {

  const { handleFormSubmission } = props;

  return (
    <div className="create-post-text-container">
      <form className="create-post-form"
        onSubmit={handleFormSubmission}
      >
        <fieldset className="create-post-fieldset">
          <label htmlFor="text-body-input"
            className="text-body-label">
            Paint the picture for us:
          </label>
          <textarea id="text-body-input"
            className="text-body-input"
            placeholder="So there I was... Fighting the spiders" >
          </textarea>
          <button className="post-submit-button"
            type="submit">
            Post
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default TextForm;