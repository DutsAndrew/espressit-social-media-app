import React, { FC, useEffect, useState } from "react";
import { EditProfileProps, UserInstance } from '../../types/interfaces';
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

  return (
    <form className="edit-profile-form"
      onSubmit={handleProfileEdit}
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
        <input id="user-name-input"
          name="user-name"
          className="edit-profile-input"
          placeholder={userInstance.user.username ? userInstance.user.username : "anonymous"}
          data-testid="username"
          required >
        </input>
        <label htmlFor="email"
          className="edit-profile-label">
          **Email:
        </label>
        <input id="email-input"
          name="email"
          className="edit-profile-input" 
          placeholder={userRef?.email ? `${userRef?.email}` : "Not Set"} 
          data-testid="email"
          required >
        </input>
        <label htmlFor="first-name"
          className="edit-profile-label">
          First Name:
        </label>
        <input id="first-name-input"
          name="first-name"
          className="edit-profile-input"
          placeholder={userInstance.user.displayName ? `${userInstance.user.displayName.split(' ')[0]}` : "Not Set"}
          data-testid="first-name" >
        </input>
        <label htmlFor="last-name"
          className="edit-profile-label" >
          Last Name:
        </label>
        <input id="last-name-input"
          name="last-name"
          className="edit-profile-input"
          placeholder={userInstance.user.displayName ? `${userInstance.user.displayName.split(' ')[1]}` : "Not Set"} 
          data-testid="last-name" >
        </input>
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
          Remove all account information and posts
        </button>
      </fieldset>
    </form>
  );
};

export default EditProfile;