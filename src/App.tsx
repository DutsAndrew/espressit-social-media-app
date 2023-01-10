import React, { lazy, Suspense} from 'react';
import './styles/App.css';

const WebApp = lazy(() => import('./components/web/WebApp'));
const MobileApp = lazy(() => import('./components/mobile/MobileApp'));

const App = () => {

  // decides if user is on mobile or web and then renders correct component
  const isMobileCheck = window.matchMedia("(pointer:coarse)").matches;
  const isMobileCheck2 = window.matchMedia("(any-pointer:coarse)").matches;

  if ("ontouchstart" in document.documentElement && (isMobileCheck || isMobileCheck2)) {
    return (
      <Suspense fallback={<h1>Loading...</h1>}>
        <MobileApp />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<h1>Loading...</h1>}>
        <WebApp />
      </Suspense>
    );
  };
  
};

export default App;
