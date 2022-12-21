import React, { FC } from "react";
import { EditProfileProps } from '../../types/interfaces';
import { User } from "firebase/auth";

const EditProfile: FC<EditProfileProps> = (props): JSX.Element => {

  const { currentUser, toggleEditProfilePage } = props;

  const handleProfileEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('editing profile');
  };

  const handleReturnToMain = () => {
    toggleEditProfilePage();
  };

  const handleDeleteAccount = () => {

  };

  const handleRemoveAccountInfo = () => {

  };

  // fetch firebase user data to check for variables below and then validate on what already exists and add it to page

  
  // user has to be logged in to reach this component, so type is switched to only User for render
  const userRef = currentUser as User;

  return (
    <form className="edit-profile-form" onSubmit={handleProfileEdit}>
      <button type="button" className="return-to-main-page-button" onClick={handleReturnToMain} >
        Return To Home
      </button>
      <fieldset className="edit-profile-fieldset">
        <legend className="edit-profile-legend" >Profile Information:</legend>
        <label htmlFor="first-name" className="edit-profile-label">First Name:</label>
        <input id="first-name-input"
          name="first-name"
          className="edit-profile-input"
          placeholder={userRef?.displayName ? `${userRef.email}` : "Not Set"}
          data-testid="first-name" >
        </input>
        <label htmlFor="last-name" className="edit-profile-label">Last Name:</label>
        <input id="last-name-input"
          name="last-name"
          className="edit-profile-input"
          data-testid="last-name" >
        </input>
        <label htmlFor="user-name" className="edit-profile-label">Username:</label>
        <input id="user-name-input"
          name="user-name"
          className="edit-profile-input"
          data-testid="username" >
        </input>
        <label htmlFor="email" className="edit-profile-label">Email:</label>
        <input id="email-input"
          name="email"
          className="edit-profile-input" 
          data-testid="email" >
        </input>
        <button type="submit" className="submit-profile-button">
          Submit Information
        </button>
      </fieldset>
      <fieldset className="edit-profile-fieldset">
        <legend className="edit-profile-legend" >Danger Zone</legend>
        <button type="button" className="delete-account-button" onClick={handleDeleteAccount} >
          Delete Account
        </button>
        <button type="button" className="remove-data-button" onClick={handleRemoveAccountInfo}>
          Remove all account information and posts
        </button>
      </fieldset>
    </form>
  );
};

export default EditProfile;