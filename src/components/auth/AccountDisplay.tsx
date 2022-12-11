import React, { FC } from "react";
import { AccountDisplayProps } from "../../types/interfaces";
import chevron from '../../assets/chevron-down.svg';
import '../../styles/account.css';

const AccountDisplay: FC<AccountDisplayProps> = (props): JSX.Element => {

  const { currentUser, signOut, toggleEditProfilePage } = props;

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
      dropDownMenu.appendChild(signOut);
      dropDownMenu.appendChild(editProfile);
      profileContainer?.appendChild(dropDownMenu);
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

  };

  if (currentUser.displayName !== null) {
    return (
      <div className="profile-container" onClick={accountDropDown} role="menu" >
        <p className="logged-in-as-text" role="paragraph">Logged in as:</p>
        <div className="img-name-container">
          <img className="profile-img" referrerPolicy="no-referrer" src={currentUser.photoURL} alt="profile" ></img>
          <p className="profile-text" >{currentUser.displayName}</p>
          <img className="account-menu-button" src={chevron} alt="chevron" ></img>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-container" onClick={accountDropDown} role="menu" >
        <p className="logged-in-as-text" role="paragraph" >Logged in as:</p>
        <div className="img-name-container">
          <p className="profile-text">{currentUser.email}</p>
          <img className="account-menu-button" src={chevron} alt="chevron" ></img>
        </div>
      </div>
    );
  };
};

export default AccountDisplay;