import React from "react";
import '../styles/LoadingBar.css';


const LoadingBar = () => {
  return (
    <div id="loading-container">
      <p id="loading-message">
        Loading!
      </p>
      <div id="loading-bar"></div>
    </div>
  );
};

export default LoadingBar;