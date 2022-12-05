import React from "react";
import Header from "../Header";
import HomePageWeb from "./HomePage";

const WebApp = () => {

  const handleSignUp = () => {
    console.log('handling sign up');
  };

  return (
    <div className="app-web">
      <Header handleSignUp={handleSignUp} />
      <HomePageWeb />
  </div>
  );
};

export default WebApp;