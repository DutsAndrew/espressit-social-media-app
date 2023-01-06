import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Posts from "../../components/web/Posts/Posts";

describe('unit tests for Posts', () => {

  const userMock = "";
  const newPostStatusMock = false;
  const newPostFetchedMock = jest.fn();

  test('renders correct items', () => {
    
    render(
      <Posts 
        user={userMock} 
        newPostStatus={newPostStatusMock}
        newPostFetched={newPostFetchedMock}
      />
    );
    
    expect(screen.getByText("Sort by:")).toBeInTheDocument();
    expect(screen.getAllByRole("img").length).toBeGreaterThan(1);

  });
  
});