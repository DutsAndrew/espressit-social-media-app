import React, { FC, useEffect, useState, ChangeEventHandler } from "react";
import { EditProfileProps, UserInstance } from '../../types/interfaces';
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const Filter = require('bad-words');

const EditProfile: FC<EditProfileProps> = (props): JSX.Element => {

  const { currentUser, toggleEditProfilePage } = props;

    // converting potential non-auth user to guaranteed firebase auth user
    const userRef = currentUser as User;

    const [userInstance, setUserInstance] = useState<UserInstance>({
      user: {
        comments: [],
        displayName: "",
        favoritePosts: [],
        posts: [],
        profileImg: "",
        uid: "",
        username: "",
      },
    });

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    (async function fetchUserInstance() {

      //firebase config
      const firebaseConfig = {
        apiKey: "AIzaSyDsPecBa3Ch5uDw4UzHiJWAjKEYOKCrNdA",
        authDomain: "espressit.firebaseapp.com",
        projectId: "espressit",
        storageBucket: "espressit.appspot.com",
        messagingSenderId: "1094129721341",
        appId: "1:1094129721341:web:dc2bdc0a2b322504b04394"
      };
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
  
      // fetch userInstance
      const userInstanceRef = doc(db, "users", userRef.uid);
      const userInstanceSnap = await getDoc(userInstanceRef);
      if (userInstanceSnap.exists()) {
        const userInstanceData = userInstanceSnap.data();
  
        // sync local state with user data
        setUserInstance({
          user: {
            comments: userInstanceData.comments,
            displayName: userInstanceData.displayName,
            favoritePosts: userInstanceData.favoritePosts,
            posts: userInstanceData.posts,
            profileImg: userInstanceData.profileImg,
            uid: userInstanceData.uid,
            username: userInstanceData.username,
          },
        });
      };
    })();
  }, []);

  const usernameFormat: RegExp = /^[a-z]{3,12}$|^[a-z]{3,12}\d{2,4}$/g;
  const mailFormat: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
  const filter = new Filter();

  const handleProfileEditChange = (e: any) => {
    e.preventDefault();
    const entryThatChanged = e.target;
    const errorText = entryThatChanged.nextSibling as HTMLElement;
    if (entryThatChanged && errorText) {
      if ((entryThatChanged.id === "username-edit-input"
        && entryThatChanged.validity.valid
        && entryThatChanged.value.match(usernameFormat)
        && !filter.isProfane(entryThatChanged.value))

        || (entryThatChanged.id === "email-edit-input" 
        && entryThatChanged.validity.valid
        && entryThatChanged.value.match(mailFormat))

        || (entryThatChanged.id === "profile-picture-edit-input"
        && entryThatChanged.validity.valid)
      ) {
        errorText.textContent = "";
        errorText.className = "error";
      } else {
        showError(entryThatChanged, errorText);
      };
    };
  };

  const showError = (entry: any, error: any): void => {

    if (entry.id === 'username-edit-input') {
      if (entry.validity.valueMissing) {
        error.textContent = "You must have a username entered to submit an account edit";
        error.classList.add("error", "error-active");
      } else if (!entry.value.match(usernameFormat)) {
        error.textContent = "Your username does not match our rules of: 1) 3-12 lowercase letters or 3-12 lowercase letters and 2-4 numbers, 2) no symbols, 3) no uppercase characters";
        error.classList.add("error", "error-active");
      } else if (filter.isProfane(entry.value)) {
        error.textContent = "We don't accept profanity in usernames, sorry :(";
        error.classList.add("error", "error-active");
      }
      return;
    };

    if (entry.id === 'email-edit-input') {
      if (entry.validity.valueMissing) {
        error.textContent = "You must have an email entered to submit an account edit";
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

  };

  const handlePictureChange = (e: any) => {
    setSelectedFile(e?.target.files[0]);
    setIsFilePicked(true);
  };

  const submitProfileEdit = (e: React.FormEvent<HTMLFormElement>): void  => {
    e.preventDefault();

    const usernameEntry = (document.getElementById("username-edit-input") as HTMLInputElement);
    const emailEntry = (document.getElementById("email-edit-input") as HTMLInputElement);
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

    if (emailEntry.validity.valid
      && activeErrors === 0
      ) {
        // createAccountWithEmailAndPassword(usernameEntry.value, emailEntry.value, passwordEntry.value);
      };
  }

  const handleReturnToMain = () => {
    toggleEditProfilePage();
  };

  const handleDeleteAccount = () => {

  };

  const handleRemoveAccountInfo = () => {

  };

  return (
    <form className="edit-profile-form"
      onSubmit={submitProfileEdit}
    >
      <button type="button"
        className="return-to-main-page-button"
        onClick={handleReturnToMain} >
        Return To Home
      </button>
      <fieldset className="edit-profile-fieldset">
        <legend className="edit-profile-legend" >
          Profile Information:
        </legend>
        <label htmlFor="user-name"
          className="edit-profile-label">
          **Username:
        </label>
        <input id="username-edit-input"
          name="user-name"
          className="edit-profile-input"
          placeholder={userInstance.user.username ? userInstance.user.username : "anonymous"}
          onChange={handleProfileEditChange}
          data-testid="username"
          required >
        </input>
        <p id="username-edit-input-error"
          className ="error-msg" >
        </p>
        <label htmlFor="email"
          className="edit-profile-label">
          **Email:
        </label>
        <input id="email-edit-input"
          name="email"
          className="edit-profile-input" 
          placeholder={userRef.email ? `${userRef.email}` : "Not Set"} 
          onChange={handleProfileEditChange}
          data-testid="email"
          required >
        </input>
        <p id="email-edit-input-error"
          className ="error-msg" >
        </p>
        <label htmlFor="profile-picture"
          className="edit-profile-label">
          Profile Picture:
        </label>
        <input id="profile-picture-edit-input" 
          className="edit-profile-input"
          type="file"
          onChange={handlePictureChange}
          alt="user profile picture"
          accept="image/*" >
        </input>
        <p id="profile-picture-input-error"
          className ="error-msg" >
        </p>
        <button type="submit"
          className="submit-profile-button">
          Submit Information
        </button>
      </fieldset>
      <fieldset className="edit-profile-fieldset">
        <legend className="edit-profile-legend" >
          Danger Zone
        </legend>
        <button type="button"
          className="delete-account-button"
          onClick={handleDeleteAccount} >
          Delete Account
        </button>
        <button type="button"
          className="remove-data-button"
          onClick={handleRemoveAccountInfo}>
          Remove all: comments, posts, and favorites
        </button>
      </fieldset>
    </form>
  );
};

export default EditProfile;