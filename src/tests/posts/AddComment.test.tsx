import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AddComment from "../../components/web/Posts/AddComent";

describe('unit tests for AddComment', () => {

  const handleAddCommentToPostMock = jest.fn();

  test('renders the correct items', () => {

    render(
      <AddComment handleAddCommentToPost={handleAddCommentToPostMock} />
    );

    const addCommentBox = screen.getByPlaceholderText("Add Comment");
    const submitComment = screen.getByRole("button", { name: "Submit Comment" })

    expect(addCommentBox).toBeInTheDocument();
    expect(submitComment).toBeInTheDocument();

  });

  test('user can type in add comment box', () => {

    render(
      <AddComment handleAddCommentToPost={handleAddCommentToPostMock} />
    );

    userEvent.type(screen.getByPlaceholderText("Add Comment"), "I disagree");

    expect(screen.getByDisplayValue("I disagree")).toBeInTheDocument();

  });

  test('thank you message displays on good submit', () => {
  
    render(
      <AddComment handleAddCommentToPost={handleAddCommentToPostMock} />
    );

    const submitComment = screen.getByRole("button", { name: "Submit Comment" })
    userEvent.click(submitComment);

    expect(screen.getByText("Thank you for contributing! :)")).toBeInTheDocument();

  });
  
});