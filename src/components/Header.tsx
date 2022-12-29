import React, { FC } from "react";
import styled from 'styled-components'
import '../styles/auth.css';
import espresso from '../assets/espresso.svg';
import { HeaderProps } from "../types/interfaces";
import AccountDisplay from "./auth/AccountDisplay";

const HeaderWrapper = styled.div `
  width: 100vw;
  height: 10vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  background-color: rgb(77, 39, 14, 1);
  border-bottom: 1px solid #80411e;
`;

const LogoWrapper = styled.div `
  width: 30vw;
  height: 10vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1vw;
`;

const Title = styled.p `
  width: 5vw;
  height: 10vh;
  font-size: 2em;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: rgb(138, 109, 76);
`;

const AccountWrapper = styled.div `
  width: 30vw;
  height: 10vh;
  font-size: 1em;
  display: flex;
  margin: 0;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
`;

const Header: FC<HeaderProps> = (props): JSX.Element => {

  const { handleSignUp, handleLogIn, currentUser, signOut, toggleEditProfilePage, toggleViewFavoritesPage } = props;

  // if user isn't logged in
  if (typeof currentUser === 'string') {
    return (
      <HeaderWrapper>
        <LogoWrapper>
          <img className="espresso-logo" src={espresso} alt="espresso" ></img>
          <Title>
            Espressit!
          </Title>
        </LogoWrapper>
        <AccountWrapper>
          <p className="sign-up-link" onClick={handleSignUp} >Sign Up</p>
          <p className="sign-in-link" onClick={handleLogIn} >Sign In</p>
        </AccountWrapper>
      </HeaderWrapper>
    );
  };

  // if logged in
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <img className="espresso-logo" src={espresso} alt="espresso" ></img>
        <Title>
          Espressit!
        </Title>
      </LogoWrapper>
      <AccountWrapper>
        <AccountDisplay currentUser={currentUser}
          signOut={signOut}
          toggleEditProfilePage={toggleEditProfilePage} 
          toggleViewFavoritesPage={toggleViewFavoritesPage}
        />
      </AccountWrapper>
    </HeaderWrapper>
  );
};

export default Header;