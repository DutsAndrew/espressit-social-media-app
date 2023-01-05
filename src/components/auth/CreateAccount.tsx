import React, { FC, MouseEventHandler, KeyboardEvent } from "react";
import { CreateAccountProps } from '../../types/interfaces';
const Filter = require('bad-words');

const CreateAccount: FC<CreateAccountProps> = (props): JSX.Element => {

  const { createAccountWithEmailAndPassword, handleSignUp } = props;

  const usernameFormat: RegExp = /^[a-z]{3,12}$|^[a-z]{3,12}\d{2,4}$/g;
  const mailFormat: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
  const passwordFormat: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
  const filter = new Filter();

  const handleFormChange = (e: any): void => {
    const entryThatChanged = e.target as HTMLInputElement;
    const errorText = e.target.nextSibling;
    if (entryThatChanged && errorText) {
      if ((entryThatChanged.validity.valid && entryThatChanged.value.match(usernameFormat) && !filter.isProfane(entryThatChanged.value))
        || (entryThatChanged.validity.valid && entryThatChanged.value.match(mailFormat))
        || (entryThatChanged.validity.valid && entryThatChanged.value.match(passwordFormat))
      ) {
        errorText.textContent = "";
        errorText.className = "error";
      } else {
        showError(entryThatChanged, errorText);
      };
    };
  };

  const showError = (entry: any, error: any): void => {

    if (entry.id === 'username-input') {
      if (entry.validity.valueMissing) {
        error.textContent = "You must have a username to create an account";
        error.classList.add("error", "error-active");
      } else if (!entry.value.match(usernameFormat)) {
        error.textContent = "Your username does not match our rules of: 1) 3-12 lowercase letters or 3-12 lowercase letters and 2-4 numbers, 2) no symbols, 3) no uppercase characters";
        error.classList.add("error", "error-active");
      } else if (filter.isProfane(entry.value)) {
        error.textContent = "We don't allow profanity in usernames, sorry :(";
        error.classList.add("error", "error-active");
      };
      return;
    };

    if (entry.id === 'email-input') {
      if (entry.validity.valueMissing) {
        error.textContent = "You need to enter an email address";
        error.classList.add("error", "error-active");
      } else if (!entry.value.match(mailFormat)) {
        error.textContent = `Your email address doesn't seem to follow the traditional email patterns, please try again`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooShort) {
        error.textContent = `Your email should be at least ${entry.minLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooLong) {
        error.textContent = `Your email should be no more than ${entry.maxLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      }
      return;
    };

    if (entry.id === 'password-input') {
      if (entry.validity.valueMissing) {
        error.textContent = "You need to enter a password";
        error.classList.add("error", "error-active");
      } else if (!entry.value.match(passwordFormat)) {
        error.textContent = `Your password must have at least: 1) One uppercase letter, 2) One lowercase letter, 3) One number, 4) One symbol, 5) And be at least 8 characters in length`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooShort) {
        error.textContent = `Your password should be at least ${entry.minLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      } else if (entry.validity.tooLong) {
        error.textContent = `Your password should be no more than ${entry.maxLength} characters; you entered: ${entry.value.length}`;
        error.classList.add("error", "error-active");
      }
      return;
    };

    if (entry.id === 'password-confirm-input') {
      if (entry.validity.valueMissing) {
        error.textContent = "You need to confirm your password";
        error.classList.add("error", "error-active");
      } else if (entry.value !== entry.previousSibling.previousSibling.value) {
        error.textContent = `Your passwords do not match`;
        error.classList.add("error", "error-active");
      }
      return;
    };
  };

  const submitAccountCreationForm = (e: any): void  => {
    e.preventDefault();

    const usernameEntry = (document.getElementById("username-input") as HTMLInputElement);
    const emailEntry = (document.getElementById("email-input") as HTMLInputElement);
    const passwordEntry = (document.getElementById("password-input") as HTMLInputElement);
    const passwordConfirmEntry = (document.getElementById("password-confirm-input") as HTMLInputElement);
    const activeErrors = document.querySelectorAll('.error-active').length;

    if (usernameEntry) {
      if (!usernameEntry.validity.valid || !usernameEntry.value.match(usernameFormat)) {
        showError(usernameEntry, usernameEntry.nextSibling);
        return;
      };
    };

    if (emailEntry) {
      if (!emailEntry.validity.valid || !emailEntry.value.match(mailFormat)) {
        showError(emailEntry, emailEntry.nextSibling);
        return;
      };
    };

    if (passwordEntry) {
      if (!passwordEntry.validity.valid || !passwordEntry.value.match(passwordFormat)) {
        showError(passwordEntry, passwordEntry.nextSibling);
        return;
      };
    };

    if (passwordConfirmEntry) {
      if ((!passwordConfirmEntry.validity.valid || !passwordConfirmEntry.value.match(passwordFormat))
        && passwordEntry.value === passwordConfirmEntry.value
        ) {
          showError(passwordConfirmEntry, passwordConfirmEntry.nextSibling);
          return;
      };
    };

    if (emailEntry.validity.valid
      && passwordEntry.validity.valid
      && passwordConfirmEntry.validity.valid
      && activeErrors === 0
      ) {
        createAccountWithEmailAndPassword(usernameEntry.value, emailEntry.value, passwordEntry.value);
      };
  };

  return (
    <form id="user-creation-form"
      onKeyDown={(e) => e.key === "Enter" ? e.preventDefault() : null} >
      <button id="close-form-button"
        onClick={handleSignUp as unknown as MouseEventHandler<HTMLButtonElement>} >
        X Close Form
      </button>
      <fieldset id="create-account-fieldset" >
        <legend id="create-account-legend">
          Create an account:
        </legend>
        <label htmlFor="username-input" 
          id="username-label">
          *Username:
        </label>
        <input id="username-input" 
          placeholder="MischievousJack92"
          onChange={handleFormChange}
          minLength={3}
          maxLength={16}
          type="text"
          required>
        </input>
        <p id="username-input-error"
          className ="error-msg" >
        </p>
        <label htmlFor="email-input"
          id="email-label" >
          *Email:
        </label>
        <input id="email-input" 
          placeholder="JohnWick92@gmail.com"
          onChange={handleFormChange}
          minLength={9}
          maxLength={253}
          type="email"
          required>
        </input>
        <p id="email-input-error"
          className ="error-msg" >
        </p>
        <label htmlFor="password-input"
          id="password-label" >
          *Password:
        </label>
        <input id="password-input"
          placeholder="********"
          onChange={handleFormChange}
          minLength={8}
          maxLength={127}
          type="password"
          data-testid="password-input"
          required>
        </input>
        <p id="password-input-error"
          className ="error-msg" >
        </p>
        <label htmlFor="password-confirm-input"
          id="password-confirm-label" >
          *Confirm Password:
        </label>
        <input id="password-confirm-input"
          placeholder="********"
          onChange={(e) => handleFormChange(e)}
          minLength={8}
          maxLength={127}
          type="password"
          data-testid="confirm-password-input"
          required>
        </input>
        <p id="password-confirm-input-error"
          className ="error-msg" >
        </p>
        <button id="account-submit"
          type="button"
          onClick={(e) => submitAccountCreationForm(e)}>
            Submit
        </button>
      </fieldset>
    </form>
  );
};

export default CreateAccount;