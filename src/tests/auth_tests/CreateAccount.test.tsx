import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import CreateAccount from '../../components/auth/CreateAccount';

describe('unit test for create account form', () => {

  // props for CreateAccount
  const createAccMock = jest.fn();
  const signUpMock = jest.fn();

  test('create account form elements are rendered', () => {
    render(<CreateAccount createAccountWithEmailAndPassword={createAccMock} handleSignUp={signUpMock} />);
    const closeFormBtn = screen.getByRole('button', { name: "X Close Form"});
    const submitFormBtn = screen.getByRole('button', { name: "Submit"});
    const formFieldset = screen.getByRole('group', { name: "Create an account:"});
    const emailTextBox = screen.getByRole('textbox', { name: "*Email:"});
    const passwordLabel = screen.getByLabelText('*Password:');
    const passwordConfirmLabel = screen.getByLabelText('*Confirm Password:');
    expect(closeFormBtn).toBeInTheDocument();
    expect(submitFormBtn).toBeInTheDocument();
    expect(formFieldset).toBeInTheDocument();
    expect(emailTextBox).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(passwordConfirmLabel).toBeInTheDocument();
  });

  test('create account is called on form completion', () => {
    render(<CreateAccount createAccountWithEmailAndPassword={createAccMock} handleSignUp={signUpMock} />);
    const emailInput = screen.getByRole("textbox", { name: "*Email:"});
    const passwordInput = screen.getByTestId("password-input");
    const confirmPasswordInput = screen.getByTestId("confirm-password-input");
    const submitFormBtn = screen.getByRole('button', { name: "Submit"});
    userEvent.type(emailInput, "darthRevan72@gmail.com");
    expect(screen.getByDisplayValue("darthRevan72@gmail.com")).toBeInTheDocument();
    userEvent.type(passwordInput, "Strawberries9210*");
    expect(screen.getByDisplayValue("Strawberries9210*")).toBeInTheDocument();
    userEvent.type(confirmPasswordInput, "Strawberries9210*");
    expect(screen.getAllByDisplayValue("Strawberries9210*")).toHaveLength(2);
    userEvent.click(submitFormBtn);
    expect(createAccMock).toBeCalled();
  });

});