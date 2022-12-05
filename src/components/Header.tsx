import React, { FC } from "react";
import styled from 'styled-components'
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import '../styles/auth.css';
import espresso from '../assets/espresso.svg';
import { HeaderProps } from "../types/interfaces";

const HeaderWrapper = styled.div `
  width: 100vw;
  height: 10vh;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
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
`;

const AccountWrapper = styled.div `
  width: 10vw;
  height: 10vh;
  font-size: 1em;
  display: flex;
  margin: 0;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
`;

const Header: FC<HeaderProps> = (props): JSX.Element => {

  const { handleSignUp } = props;

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <img className="espresso-logo" src={espresso} alt="espresso" ></img>
        <Title>
          Espressit!
        </Title>
      </LogoWrapper>
      <AccountWrapper>
        <SignUp handleSignUp={handleSignUp} />
        <SignIn />
      </AccountWrapper>
    </HeaderWrapper>
  );
};

export default Header;