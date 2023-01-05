import React, { FC, useEffect, useState } from "react";
import { EditProfileProps, UserInstance } from '../../types/interfaces';
import { User, getAuth, deleteUser, reload } from "firebase/auth";
import { doc, getDoc, updateDoc, getFirestore, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
const Filter = require('bad-words');

const EditProfile: FC<EditProfileProps> = (props): JSX.Element => {

  const { 
    currentUser,
    toggleEditProfilePage,
    returnToMainAfterProfileEdit 
  } = props;

    // converting potential non-auth user to guaranteed firebase auth user
    const userRef = currentUser as User;

    const [userInstance, setUserInstance] = useState<UserInstance>({
      user: {
        comments: [],
        displayName: "",
        favoritePosts: [],
        posts: [],
        imgURL: "",
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
            imgURL: userInstanceData.imgURL,
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
        error.textContent = "If you are updating your username this input cannot be blank :)";
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

    // validate username edit
    if (usernameEntry.value.length !== 0) {

      if (activeErrors !== 0) return;

      if (!usernameEntry.validity.valid || !usernameEntry.value.match(usernameFormat)) {
        showError(usernameEntry, usernameEntry.nextSibling);
        return;
      };

      // check if profanity is hidden in username
      for (let i = 0; i < usernameEntry.value.length; i++) {
        const usernameText = usernameEntry.value.slice(i);
        if (filter.isProfane(usernameText)) {
          const errorText = document.querySelector('#username-edit-input-error');
          if (errorText) {
            errorText.textContent = "We don't accept profanity in usernames, sorry :(";
            errorText.classList.add("error", "error-active");
            return;
          };
        };
      };

      submitNewUsername(usernameEntry.value);
    };

    // validate picture
    if (selectedFile !== undefined) {
      uploadNewProfileImg();
    };
  }

  const submitNewUsername = (newUsername: string): void => {
    if (newUsername.length > 2) {
      (async function saveNewUsernameToUserInstance() {
        const userInstanceRef = doc(db, "users", userRef.uid);
        await updateDoc(userInstanceRef, {
          username: newUsername,
        });
      })();
      // return to home
      returnToMainAfterProfileEdit();
    };
  };

  // remove previous imgURL from storage if there was one
  async function removePreviousProfileImg() {
    const userInstanceRef = doc(db, "users", userRef.uid);
    const userSnap = await getDoc(userInstanceRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      if (userData.imgURL.slice(0, 38) === 'https://firebasestorage.googleapis.com') {
        // user has a imgURL that was uploaded to firebase and not from Google API
        const currentProfilePhotoRef = ref(storage, userData.imgURLRef);
        deleteObject(currentProfilePhotoRef).then(() => {
          // File deleted successfully, set userInstance to empty string
            updateDoc(userInstanceRef, {
              imgURLRef: "",
            });
        }).catch((error) => {
          alert('we were unable to remove your previous profile picture and therefor did not upload your new picture, please try again later');
          return;
        });
      };
    };
  };

  const uploadNewProfileImg = (): void => {  

    // handle profile picture upload/update
    if (typeof selectedFile === undefined || typeof selectedFile === 'undefined') {
      return;
    };

    if (typeof selectedFile !== undefined ||  typeof selectedFile !== 'undefined') {

      // remove previous imgURL from storage if there was one
      removePreviousProfileImg();

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
                  imgURL: url,
                  imgURLRef: `images/${(selectedFile as any).name}`,
                });
                // return to home
                returnToMainAfterProfileEdit();
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

  const handleDeleteAccount = async (): Promise<void> => {
    const auth = getAuth();
    const user = auth.currentUser;

    await removePreviousProfileImg();

    await deleteDoc(doc(db, "users", userRef.uid)).then(() => {
      // userInstance deleted
    }).catch((error) => {
      alert('We were not able to remove your posts, comments, etc; please reach out to dutsandrew@gmail.com to resolve this issue');
    })

    await deleteUser((user as User)).then(() => {
      // User deleted.
    }).catch((error) => {
      alert('We were not able to delete your account, please try again later!');
    });
    
    returnToMainAfterProfileEdit();
    window.location.reload();
  };

  const handleRemoveAccountInfo = (): void => {
    const userInstanceRef = doc(db, "users", userRef.uid);
      updateDoc(userInstanceRef, {
        comments: [],
        favoritePosts: [],
        posts: [],
    });
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
          data-testid="username" >
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