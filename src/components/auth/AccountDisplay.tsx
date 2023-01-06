import React, { FC, useEffect, useState } from "react";
import { AccountDisplayProps, UserInstance } from "../../types/interfaces";
import chevron from '../../assets/chevron-down.svg';
import '../../styles/account.css';
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import anonymousProfile from '../../assets/profile-anonymous.svg';

const AccountDisplay: FC<AccountDisplayProps> = (props): JSX.Element => {

  const { 
    currentUser,
    signOut,
    toggleEditProfilePage,
    toggleViewFavoritesPage 
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
            imgURL: userInstanceData.imgURL,
            uid: userInstanceData.uid,
            username: userInstanceData.username,
          },
        });
      };
    })();
  });

  const accountDropDown = (e: React.MouseEvent) => {

    // open and closes drop down menu
    const profileContainer = document.querySelector('.profile-container');
    const dropDownMenu = document.querySelector('.account-drop-down-menu');
    const chevronButton = document.querySelector('.account-menu-button');
    const profileText = document.querySelector('.profile-text');

    if (!dropDownMenu) {
      chevronButton?.classList.add('drop-down-active');
      profileText?.classList.add('drop-down-text-active');
      const dropDownMenu = document.createElement('div');
        dropDownMenu.classList.remove('account-menu-button');
        dropDownMenu.classList.add('account-drop-down-menu');
      const signOut = document.createElement('p');
        signOut.classList.add('sign-out-text');
        signOut.textContent = 'Sign Out';
      const editProfile = document.createElement('p');
        editProfile.classList.add('edit-profile-text');
        editProfile.textContent = 'Edit Profile';
      const favoritePosts = document.createElement('p');
        favoritePosts.classList.add('view-favorite-text');
        favoritePosts.textContent = 'View Favorites';

      dropDownMenu.appendChild(signOut);
      dropDownMenu.appendChild(editProfile);
      dropDownMenu.appendChild(favoritePosts);
      profileContainer?.appendChild(dropDownMenu);

      setTimeout(() => {
        dropDownMenu?.remove()
        chevronButton?.classList.remove('drop-down-active');
        chevronButton?.classList.add('account-menu-button');
        profileText?.classList.remove('drop-down-text-active');
      }, 5000);
    };

    if (dropDownMenu) {
      dropDownMenu?.remove()
      chevronButton?.classList.remove('drop-down-active');
      chevronButton?.classList.add('account-menu-button');
      profileText?.classList.remove('drop-down-text-active');
    };


    const target = e.target as Element;

    if (target.classList.contains('sign-out-text')) {
      signOut();
      return;
    };

    if (target.classList.contains('edit-profile-text')) {
      toggleEditProfilePage();
      return;
    };

    if (target.classList.contains('view-favorite-text')) {
      toggleViewFavoritesPage();
      return;
    }

  };

  if (userInstance.user) {
    return (
      <div className="profile-container"
        onClick={accountDropDown}
        role="menu"
      >
        <p className="logged-in-as-text"
          role="paragraph">
          Logged in as:
        </p>
        <div className="img-name-container">
          <img className="profile-img"
            referrerPolicy="no-referrer"
            src={userInstance.user.imgURL ? userInstance.user.imgURL : anonymousProfile}
            alt="profile" >
          </img>
          <p className="profile-text" >
            {userInstance.user.username}
          </p>
          <img className="account-menu-button"
            src={chevron}
            alt="chevron" >
          </img>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-container" 
        onClick={accountDropDown}
        role="menu"
      >
        <p className="logged-in-as-text"
          role="paragraph" >
          Logged in as:
        </p>
        <div className="img-name-container">
          <p className="profile-text">
            {userRef.email}
          </p>
          <img className="account-menu-button"
            src={chevron}
            alt="chevron" >
          </img>
        </div>
      </div>
    );
  };

};

export default AccountDisplay;