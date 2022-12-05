import React, { useState } from "react";
import Header from "../Header";
import HomePageMobile from "./HomePage";
import { userState } from "../../types/interfaces";

const MobileApp = () => {

  const [renderStatus, setRenderStatus] = useState({
    signUp: false,
    logIn: false,
    viewAccount: false,
    closeAccount: false,
    viewPost: false,
    closePost: false,
    openShare: false,
    closeShare: false,
  });

  const [userStatus, setUserStatus] = useState<userState>({
    formCompleted: false,
    currentUser: '',
    errorStatus: '',
  });

  const handleSignUp = () => {
    console.log('handling signup');
  };

  const handleLogIn = () => {
    console.log('logging in');
  };

  return (
    <div className="app-mobile">
        <Header handleSignUp={handleSignUp} handleLogIn={handleLogIn} userStatus={userStatus} />
        <HomePageMobile />
    </div>
  )
};

export default MobileApp;