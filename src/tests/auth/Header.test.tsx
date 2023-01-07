import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Header from '../../components/Header';
import { User } from "firebase/auth";

describe('unit test for header', () => {

  // props passed into <Header/>
  const signUpMock = jest.fn();
  const logInMock = jest.fn();
  const signOutMock = jest.fn();
  const editProfileMock = jest.fn();
  const toggleViewContributionsPageMock = jest.fn();
  const userMock = "Bob Dillon" as unknown as User;

  test('renders header, title', () => {

    render(
      <Header handleSignUp={signUpMock}
        handleLogIn={logInMock}
        currentUser={userMock}
        signOut={signOutMock}
        toggleEditProfilePage={editProfileMock}
        toggleViewContributionsPage={toggleViewContributionsPageMock}
      />
    );

    const websiteTitle = screen.getByText(/Espressit!/i);
    expect(websiteTitle).toBeInTheDocument();
  });

  test('header matches snapshot', () => {
    const { container } = render(
      <Header handleSignUp={signUpMock}
        handleLogIn={logInMock}
        currentUser={userMock}
        signOut={signOutMock}
        toggleEditProfilePage={editProfileMock}
        toggleViewContributionsPage={toggleViewContributionsPageMock}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('signup and login are visible when not signed in', () => {

    render(
      <Header handleSignUp={signUpMock}
        handleLogIn={logInMock}
        currentUser={userMock}
        signOut={signOutMock}
        toggleEditProfilePage={editProfileMock}
        toggleViewContributionsPage={toggleViewContributionsPageMock}
      />
    );

    const signUpText = screen.getByText(/Sign Up/i);
    const signInText = screen.getByText(/Sign In/i);
    expect(signUpText).toBeInTheDocument();
    expect(signInText).toBeInTheDocument();
  });

  test('sign up form opens on text click', () => {

    render(
      <Header handleSignUp={signUpMock}
        handleLogIn={logInMock}
        currentUser={userMock}
        signOut={signOutMock}
        toggleEditProfilePage={editProfileMock}
        toggleViewContributionsPage={toggleViewContributionsPageMock}
      />
    );

    const link: any = screen.getByText("Sign Up");
    userEvent.click(link);
    expect(signUpMock).toHaveBeenCalled();
  });

  test('sign in form opens on text click', () => {
    
    render(
      <Header handleSignUp={signUpMock}
        handleLogIn={logInMock}
        currentUser={userMock}
        signOut={signOutMock}
        toggleEditProfilePage={editProfileMock}
        toggleViewContributionsPage={toggleViewContributionsPageMock}
      />
    );

    const link: any = screen.getByText("Sign In");
    userEvent.click(link);
    expect(logInMock).toHaveBeenCalled();
  });

});