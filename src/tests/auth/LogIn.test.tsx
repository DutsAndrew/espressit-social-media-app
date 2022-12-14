import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import LogIn from '../../components/auth/LogIn';

describe('unit test for Log In', () => {

  // props for LogIn component
  const signInUserMock = jest.fn();
  const handleLogInMock = jest.fn();
  const signInWithGoogle = jest.fn();

  test('correct items are rendered', () => {
    render(<LogIn signInUser={signInUserMock} handleLogIn={handleLogInMock} signInWithGoogleAccount={signInWithGoogle} />);
    expect(screen.getByRole("button", { name: "X Close Form"})).toBeInTheDocument();
    expect(screen.getByLabelText("*Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("*Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In"})).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in with google logo"})).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  // no test for log in submit, since the function is an internal method for LogIn component

  test('can close Log In form', () => {
    render(<LogIn signInUser={signInUserMock} handleLogIn={handleLogInMock} signInWithGoogleAccount={signInWithGoogle} />);
    const closeFormBtn = screen.getByRole("button", { name: "X Close Form"});
    userEvent.click(closeFormBtn);
    expect(handleLogInMock).toBeCalled();
  });
  
});