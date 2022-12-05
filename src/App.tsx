import React from 'react';
import './styles/App.css';
import { initializeApp } from "firebase/app";
import WebApp from './components/web/WebApp';
import MobileApp from './components/mobile/MobileApp';

const App = () => {

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

  // decides if user is on mobile or web and then renders correct component
  const isMobileCheck = window.matchMedia("(pointer:coarse)").matches;
  const isMobileCheck2 = window.matchMedia("(any-pointer:coarse)").matches;

  if ("ontouchstart" in document.documentElement && (isMobileCheck || isMobileCheck2)) {
    return (
      <MobileApp />
    );
  } else {
    return (
      <WebApp />
    );
  };
};

export default App;
