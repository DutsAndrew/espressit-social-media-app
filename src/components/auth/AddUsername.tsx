import { create } from "domain";
import React, { FC } from "react";
import { AddUsernameProps } from "types/interfaces";
import '../../styles/auth/AddUsername.css';
const Filter = require('bad-words');

const AddUsername: FC<AddUsernameProps> = (props): JSX.Element => {

  const { createUserInstanceAfterGoogleSignIn, toggleAddUsernamePage } = props;

  const filter = new Filter(),
        usernameFormat: RegExp = /^[a-z]{3,12}$|^[a-z]{3,12}\d{2,4}$/g;

  const validateUsername = (): void => {
    let input = (document.querySelector('.input-add-username') as HTMLInputElement).value;
    if (filter.isProfane(input)) {
      alert('we don\'t allow profane language');
      input = '';
      return;
    };
  };

  const handleUsernameSubmit = (e: any): void => {
    e.preventDefault();

    const input = (document.querySelector('.input-add-username') as HTMLInputElement).value,
          target = (document.querySelector('.input-add-username') as HTMLInputElement);

    if (filter.isProfane(input)) {
      alert('we don\'t allow profane language');
      return;
    } else if (!filter.isProfane(input) && target.validity.valid && input.match(usernameFormat)) {
      createUserInstanceAfterGoogleSignIn(input);
      return;
    } else {
      alert('Your username does not match our rules of: 1) 3-12 lowercase letters or 3-12 lowercase letters and 2-4 numbers, 2) no symbols, 3) no uppercase characters, 4) no swear words');
      return;
    };

  };

  const handleReturnToHome = (e: any): void => {
    e.preventDefault();
    toggleAddUsernamePage();
  };

  return (
    <form
      className="add-username-form"
      onSubmit={(e) => handleUsernameSubmit(e)}>
      <button
        className="return-from-username-button"
        type="button"
        onClick={(e) => handleReturnToHome(e)}>
        Return to Main
      </button>
      <label
        className="label-add-username">
        **Username:
      </label>
      <input
        className="input-add-username"
        placeholder="MasterChief91"
        minLength={3}
        maxLength={16}
        type="text"
        required
        onChange={() => validateUsername()}>
      </input>
      <button
        className="submit-username-button"
        type="submit" >
        Submit
      </button>
    </form>
  );
};

export default AddUsername;