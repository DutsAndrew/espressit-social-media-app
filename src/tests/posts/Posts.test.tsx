import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Posts from "../../components/web/Posts/Posts";

describe('unit tests for Posts', () => {

  test('renders correct items', () => {
    render(<Posts />);
    
    expect(screen.getByText("Sort by:")).toBeInTheDocument();
    expect(screen.getAllByRole("img").length).toBeGreaterThan(1);
  });
  
});