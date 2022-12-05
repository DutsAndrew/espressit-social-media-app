import React from "react";
import Header from "../Header";
import HomePageMobile from "./HomePage";

const MobileApp = () => {

  const handleSignUp = () => {
    console.log('handling signup');
  };

  return (
    <div className="app-mobile">
        <Header handleSignUp={handleSignUp} />
        <HomePageMobile />
    </div>
  )
};

export default MobileApp;