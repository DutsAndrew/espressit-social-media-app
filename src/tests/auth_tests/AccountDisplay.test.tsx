import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AccountDisplay from '../../components/auth/AccountDisplay';

describe('unit test for account display', () => {

  // props for AccountDisplay component tests
  const userMock = {
    displayName: "Jim Halpert",
    email: "ladyGaga93@gmail.com",
    photoURL: "this is not a real link",
  };
  const userMockWithoutDisplayName = {
    displayName: null,
    email: "ladyGaga93@gmail.com",
    photoURL: undefined,
  };
  const signOutMock = jest.fn();
  const editProfileMock = jest.fn();

  test('Account Display renders correct elements when user has a display name', () => {
    render(<AccountDisplay currentUser={userMock} signOut={signOutMock} toggleEditProfilePage={editProfileMock} />);
    const loggdInText = screen.getByRole('paragraph');
    expect(loggdInText).toBeInTheDocument();
    const profileImg = screen.getAllByRole('img')[0];
    expect(profileImg).toBeInTheDocument();
    const chevronSVG = screen.getAllByRole('img')[1];
    expect(chevronSVG).toBeInTheDocument();
    const userName = screen.getByText(/Jim Halpert/i);
    expect(userName).toBeInTheDocument();
  });

  test('Account display renders correct elements when user has just an email on login', () => {
    render(<AccountDisplay currentUser={userMockWithoutDisplayName} signOut={signOutMock} toggleEditProfilePage={editProfileMock} />);
    const loggdInText = screen.getByRole('paragraph');
    expect(loggdInText).toBeInTheDocument();
    const chevronSVG = screen.getAllByRole('img')[0];
    expect(chevronSVG).toBeInTheDocument();
    const userName = screen.getByText(/ladyGaga93@gmail.com/i);
    expect(userName).toBeInTheDocument();
  });
  
  test('drop down menu open and closes', () => {
    render(<AccountDisplay currentUser={userMock} signOut={signOutMock} toggleEditProfilePage={editProfileMock} />);
    const accountContainer = screen.getByRole("menu");
    userEvent.click(accountContainer);
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit Profile/i)).toBeInTheDocument();
    userEvent.click(accountContainer);
    expect(screen.queryByText(/Sign Out/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Edit Profile/i)).not.toBeInTheDocument();
  });
  
  test('sign out and edit profile are called on click', () => {
    const { container } = render(<AccountDisplay currentUser={userMock} signOut={signOutMock} toggleEditProfilePage={editProfileMock} />);
    const accountContainer = screen.getByRole("menu");
    userEvent.click(accountContainer);
    const signOutBtn = screen.getByText(/Sign Out/i);
    userEvent.click(signOutBtn);
    expect(signOutMock).toBeCalled();
    const editProfileBtn = screen.getByText(/Edit Profile/i);
    userEvent.click(editProfileBtn);
    expect(editProfileMock).toBeCalled();
  });
  
});