import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import EditProfile from "../../components/auth/EditProfile";
import { User } from 'firebase/auth';

describe('unit tests for Edit Profile', () => {

  // props, objects, and functions for Edit Profile component
  const currentUserMock = {
    name: "Drew",
    email: "drewit97@gmail.com",
  } as unknown as User;

  const toggleEditProfilePageMock = jest.fn();

  test('renders the correct items', () => {

    render(
      <EditProfile currentUser={currentUserMock}
        toggleEditProfilePage={toggleEditProfilePageMock}
      />
    );

    const closeBtn = screen.getByRole("button", { name: "Return To Home"});
    const submitInfoBtn = screen.getByRole("button", { name: "Submit Information"});
    const deleteAccBtn = screen.getByRole("button", { name: "Delete Account"});
    const removeInfoBtn = screen.getByRole("button", { name: "Remove all account information and posts"});
    expect(closeBtn).toBeInTheDocument();
    expect(submitInfoBtn).toBeInTheDocument();
    expect(deleteAccBtn).toBeInTheDocument();
    expect(removeInfoBtn).toBeInTheDocument();

    const profileInfo = screen.getByText(/Profile Information/i);
    const firstName = screen.getByText(/First Name:/i);
    const lastName = screen.getByText(/Last Name:/i);
    const userName = screen.getByText(/Username:/i);
    const email = screen.getByText(/Email:/i);
    expect(profileInfo).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  test('form is submitted on Submit Information click', () => {

    render(
      <EditProfile currentUser={currentUserMock}
        toggleEditProfilePage={toggleEditProfilePageMock}
      />
    );

    const submitInfoBtn = screen.getByRole("button", { name: "Submit Information"});
    const firstNameInput = screen.getByTestId("first-name");
    userEvent.type(firstNameInput, "George");
    userEvent.click(submitInfoBtn);
    expect(screen.queryByText("George")).not.toBeInTheDocument();

  });
  
});