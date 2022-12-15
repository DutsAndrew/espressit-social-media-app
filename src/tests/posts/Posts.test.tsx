import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Posts from "../../components/web/Posts/Posts";

describe('unit tests for Posts', () => {

  test('renders the correct items', () => {
    render(<Posts />);

    const sortText = screen.getByText("Sort by:");
    const sortBtn = screen.getByRole("button", { name: "New"});

    expect(sortText).toBeInTheDocument();
    expect(sortBtn).toBeInTheDocument();
  });

  test('chevron arrow click renders sort by buttons when not open and closes them when open', () => {
    render(<Posts />);

    const chevronArrow = screen.getByRole("img");
    expect(chevronArrow).toBeInTheDocument();

    userEvent.click(chevronArrow);

    const hotBtn = screen.getByRole("button", { name: "Hot"});
    expect(hotBtn).toBeInTheDocument();

    userEvent.click(chevronArrow);
    expect(hotBtn).not.toBeInTheDocument();
  });

  test('sort type is displayed after new sort selection', () => {
    render(<Posts />);

    const newBtn = screen.getByText("New");
    const chevronArrow = screen.getByRole("img");
    expect(newBtn).toBeInTheDocument();
    expect(chevronArrow).toBeInTheDocument();

    userEvent.click(chevronArrow);

    const controversialBtn = screen.getByText("Controversial");
    expect(controversialBtn).toBeInTheDocument();
    
    userEvent.click(controversialBtn);

    expect(screen.getByText("Controversial")).toBeInTheDocument();
  });
  
});