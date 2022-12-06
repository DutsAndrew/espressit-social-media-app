import React, { FC } from "react";
import { AccountDisplayProps } from "../../types/interfaces";
import chevron from '../../assets/chevron-down.svg';
import { sign } from "crypto";

const AccountDisplay: FC<AccountDisplayProps> = (props): JSX.Element => {

  const { currentUser } = props;

  const accountDropDown = (e: React.MouseEvent) => {
    const target = e.target as Element;
    if ((target.classList.contains('profile-text')
      || target.classList.contains('profile-img')
      || target.classList.contains('account-menu-button'))
      && !document.querySelector('.account-drop-down-menu')
    ) {
      const profileContainer = document.querySelector('.profile-container');
      const dropDownMenu = document.createElement('div');
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
  };

  if (currentUser.displayName !== null) {
    return (
      <div className="profile-container" onClick={accountDropDown}>
        <p className="logged-in-as-text">Logged in as:</p>
        <div className="img-name-container">
          <img className="profile-img" src={currentUser.photoURL} alt="profile" ></img>
          <p className="profile-text">{currentUser.displayName}</p>
          <img className="account-menu-button" src={chevron} alt="chevron" ></img>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-container" onClick={accountDropDown}>
        <p className="logged-in-as-text">Logged in as:</p>
        <div className="img-name-container">
          <p className="profile-text">{currentUser.email}</p>
          <img className="account-menu-button" src={chevron} alt="chevron" ></img>
        </div>
      </div>
    );
  };
};

export default AccountDisplay;