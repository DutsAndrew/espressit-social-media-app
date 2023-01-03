import React, { FC, useEffect, useState, ChangeEventHandler } from "react";
import { EditProfileProps, UserInstance } from '../../types/interfaces';
import { User } from "firebase/auth";
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { upload } from "@testing-library/user-event/dist/upload";
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
  const storage = getStorage(app);

  useEffect(() => {
    (async function fetchUserInstance(): Promise<void> {
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

  const handleProfileEditChange = (e: any): void => {
    e.preventDefault();
    const entryThatChanged = e.target;
    const errorText = entryThatChanged.nextSibling as HTMLElement;
    if (entryThatChanged && errorText) {
      if ((entryThatChanged.id === "username-edit-input"
        && entryThatChanged.validity.valid
        && entryThatChanged.value.match(usernameFormat)
        && !filter.isProfane(entryThatChanged.value))
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

  };

  const handlePictureChange = (e: any): void => {
    setSelectedFile(e?.target.files[0]);
  };

  const validateSubmitRequest = (e: React.FormEvent<HTMLFormElement>): void  => {
    e.preventDefault();

    const usernameEntry = (document.getElementById("username-edit-input") as HTMLInputElement);
    const activeErrors = document.querySelectorAll('.error-active').length;

    if (usernameEntry) {
      if (!usernameEntry.validity.valid || !usernameEntry.value.match(usernameFormat)) {
        showError(usernameEntry, usernameEntry.nextSibling);
        return;
      };
    };

    if (usernameEntry.validity.valid
      && activeErrors === 0
      ) {
        submitProfileEdits(usernameEntry.value);
      };
  };

  const submitProfileEdits = (newUsername: string): void => {
    // handle username update
    if (newUsername.length > 2) {
      (async function saveNewUsernameToUserInstance() {
        const userInstanceRef = doc(db, "users", userRef.uid);
        await updateDoc(userInstanceRef, {
          username: newUsername,
        });
         // call function here to tell WebApp to pull new username for AccountDisplay
      })();
    };

    // handle profile picture upload/update
    if (typeof selectedFile === undefined || typeof selectedFile === 'undefined') {
      return;
    };

    if (typeof selectedFile !== undefined ||  typeof selectedFile !== 'undefined') {

      // remove previous profileImg from storage if there was one
      (async function removePreviousProfileImg() {
        const userInstanceRef = doc(db, "users", userRef.uid);
        const userSnap = await getDoc(userInstanceRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (userData.profileImg.slice(0, 38) === 'https://firebasestorage.googleapis.com') {
            // user has a profileImg that was uploaded to firebase and not from Google API
            const currentProfilePhotoRef = ref(storage, userData.profileImgRef);
            deleteObject(currentProfilePhotoRef).then(() => {
              // File deleted successfully, set userInstance to empty string
              const userInstanceRef = doc(db, "users", userRef.uid);
                updateDoc(userInstanceRef, {
                  profileImgRef: "",
                });
            }).catch((error) => {
              alert('we were unable to remove your previous profile picture and therefor did not upload your new picture, please try again later');
              return;
            });
          };
        };
      })();

      (async function uploadNewPictureAndSetAsProfilePicture() {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${(selectedFile as any).name}`);
        uploadBytes(storageRef, selectedFile)
          .then((snapshot) => {
            // image has been uploaded to the db
            // download url for uploaded image
            getDownloadURL(ref(storage, `images/${(selectedFile as any).name}`))
              .then((url) => {
                // `url` is the download URL for 'images/${selectedFile.name}'
                // save url and storageRef to userInstance
                const userInstanceRef = doc(db, "users", userRef.uid);
                updateDoc(userInstanceRef, {
                  profileImg: url,
                  profileImgRef: `images/${(selectedFile as any).name}`,
                });
              })
              .catch((error) => {
                alert('your profile picture was uploaded to the database, but we were not able to save it to your profile, please try again later');
              });
          })
          .catch(() => {
            alert('your image was not uploaded to the server, please try again later');
            return;
          });
      })();
    };
  };

  const handleReturnToMain = (): void => {
    toggleEditProfilePage();
  };

  const handleDeleteAccount = (): void => {

  };

  const handleRemoveAccountInfo = (): void => {

  };

  return (
    <form className="edit-profile-form"
      onSubmit={validateSubmitRequest}
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