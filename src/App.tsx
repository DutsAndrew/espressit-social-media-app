import React from 'react';
import './styles/App.css';
import WebApp from './components/web/WebApp';
import MobileApp from './components/mobile/MobileApp';

const App = () => {

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
