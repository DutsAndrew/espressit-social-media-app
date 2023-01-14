import React, { FC, lazy, Suspense } from "react";
import { HeaderProps } from "../types/interfaces";
import '../styles/auth/auth.css';
import styled from 'styled-components'
import espresso from '../assets/espresso.svg';
import LoadingBar from "./LoadingBar";


// COMPUTER VERSION - STYLED COMPONENTS
const HeaderWrapperComputer = styled.div `
width: 100vw;
height: 10vh;
display: flex;
flex-flow: row nowrap;
justify-content: space-between;
background-color: rgb(77, 39, 14, 1);
border-bottom: 1px solid #80411e;
`;

const LogoWrapperComputer = styled.div `
width: 30vw;
height: 10vh;
display: flex;
justify-content: flex-start;
align-items: center;
gap: 1vw;
`;

const TitleComputer = styled.p `
width: auto;
height: 10vh;
font-size: 2em;
margin: 0;
display: flex;
justify-content: flex-start;
align-items: center;
color: rgb(138, 109, 76);
`;

const AccountWrapperComputer = styled.div `
width: 30vw;
height: 10vh;
font-size: 1em;
display: flex;
margin: 0;
flex-flow: column nowrap;
justify-content: space-evenly;
align-items: center;
`;

// MOBILE VERSION - STYLED COMPONENTS
const HeaderWrapperMobile = styled.div `
width: 100vw;
height: 10vh;
display: flex;
flex-flow: row nowrap;
justify-content: space-between;
background-color: rgb(77, 39, 14, 1);
border-bottom: 1px solid #80411e;
`;

const LogoWrapperMobile = styled.div `
width: 35vw;
height: 10vh;
display: flex;
justify-content: flex-start;
align-items: center;
gap: 1vw;
`;

const TitleMobile = styled.p `
width: 35vw;
height: 10vh;
font-size: 1.25em;
margin: 0;
display: flex;
justify-content: flex-start;
align-items: center;
color: rgb(138, 109, 76);
`;

const AccountWrapperMobile = styled.div `
width: 40vw;
height: 10vh;
font-size: 1em;
display: flex;
margin: 0;
flex-flow: column nowrap;
justify-content: space-evenly;
align-items: center;
`;

const AccountDisplay = lazy(() => import('./auth/AccountDisplay'));

const Header: FC<HeaderProps> = (props): JSX.Element => {

  const { 
    handleSignUp,
    handleLogIn,
    currentUser,
    signOut,
    toggleEditProfilePage,
    toggleViewContributionsPage 
  } = props;

  // decides if user is on mobile or web and then renders correct component
  const isMobileCheck = window.matchMedia("(pointer:coarse)").matches,
        isMobileCheck2 = window.matchMedia("(any-pointer:coarse)").matches;

  if ("ontouchstart" in document.documentElement || isMobileCheck || isMobileCheck2) {
    // use mobile styling
    // if user isn't logged in
    if (typeof currentUser === 'string') {
      return (
        <HeaderWrapperMobile>
          <LogoWrapperMobile>
            <img className="espresso-logo" src={espresso} alt="espresso" ></img>
            <TitleMobile>
              Espressit!
            </TitleMobile>
          </LogoWrapperMobile>
          <AccountWrapperMobile>
            <p className="sign-up-link" onClick={handleSignUp} >Sign Up</p>
            <p className="sign-in-link" onClick={handleLogIn} >Sign In</p>
          </AccountWrapperMobile>
        </HeaderWrapperMobile>
      );
    };

    // if logged in
    return (
      <Suspense fallback={<LoadingBar/>}>
        <HeaderWrapperMobile>
          <LogoWrapperMobile>
            <img className="espresso-logo" src={espresso} alt="espresso" ></img>
            <TitleMobile>
              Espressit!
            </TitleMobile>
          </LogoWrapperMobile>
          <AccountWrapperMobile>
            <AccountDisplay currentUser={currentUser}
              signOut={signOut}
              toggleEditProfilePage={toggleEditProfilePage} 
              toggleViewContributionsPage={toggleViewContributionsPage}
            />
          </AccountWrapperMobile>
        </HeaderWrapperMobile>
      </Suspense>
    );
  } else {
    // user is on computer
    // if user isn't logged in
    if (typeof currentUser === 'string') {
      return (
        <HeaderWrapperComputer>
          <LogoWrapperComputer>
            <img className="espresso-logo" src={espresso} alt="espresso" ></img>
            <TitleComputer>
              Espressit!
            </TitleComputer>
          </LogoWrapperComputer>
          <AccountWrapperComputer>
            <p className="sign-up-link" onClick={handleSignUp} >Sign Up</p>
            <p className="sign-in-link" onClick={handleLogIn} >Sign In</p>
          </AccountWrapperComputer>
        </HeaderWrapperComputer>
      );
    };

    // if logged in
    return (
      <Suspense fallback={<LoadingBar/>}>
        <HeaderWrapperComputer>
          <LogoWrapperComputer>
            <img className="espresso-logo" src={espresso} alt="espresso" ></img>
            <TitleComputer>
              Espressit!
            </TitleComputer>
          </LogoWrapperComputer>
          <AccountWrapperComputer>
            <AccountDisplay currentUser={currentUser}
              signOut={signOut}
              toggleEditProfilePage={toggleEditProfilePage} 
              toggleViewContributionsPage={toggleViewContributionsPage}
            />
          </AccountWrapperComputer>
        </HeaderWrapperComputer>
      </Suspense>
    );
  };
};

export default Header;