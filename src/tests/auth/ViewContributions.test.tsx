import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ViewContributions from '../../components/auth/ViewContributions';

describe('unit test for ViewContributions', () => {

  // REPLACE DB QUERIES WITH THIS DATA IN VIEWCONTRIBUTIONS COMPONENT FOR TESTING
  const postMock = [
    {
      title: "This is a post",
    },
    {
      title: "This is a post as well",
    },
  ];
  const commentsMock = [
    {
      comment: "This is a comment",
    },
    {
      comment: "This is also a comment",
    },
  ];
  const favoritesMock = [
    {
      title: "This is a favorited post",
    },
    {
      title: "This is also a favorited post",
    },
  ];

  const currentUserMock = '';
  const toggleViewContributionsPageMock = jest.fn();

  test('displays nav', () => {

    render(
      <ViewContributions 
        currentUser={currentUserMock}
        toggleViewContributionsPage={toggleViewContributionsPageMock}
      />
    );

    const returnButton = screen.getByRole("button", { name: "Return to Home" });
    const promptHeader = screen.getByRole("heading", { name: "Select one of the following:"});
    const postHeader = screen.getByRole("heading", { name: "Posts" });
    const commentsHeader = screen.getByRole("heading", { name: "Comments" });
    const favoritesHeader = screen.getByRole("heading", { name: "Favorites" });

    expect(returnButton).toBeInTheDocument();
    expect(promptHeader).toBeInTheDocument();
    expect(postHeader).toBeInTheDocument();
    expect(commentsHeader).toBeInTheDocument();
    expect(favoritesHeader).toBeInTheDocument();
  });

  test('user click on return button sends user back to Home', () => {

    render(
      <ViewContributions 
        currentUser={currentUserMock}
        toggleViewContributionsPage={toggleViewContributionsPageMock}
      />
    );

    const returnButton = screen.getByRole("button", { name: "Return to Home" });
    userEvent.click(returnButton);
    expect(toggleViewContributionsPageMock).toHaveBeenCalled();

  });

  test('user click on "Posts" renders posts to the page', () => {

    render(
      <ViewContributions 
        currentUser={currentUserMock}
        toggleViewContributionsPage={toggleViewContributionsPageMock}
      />
    );

    const promptHeader = screen.getByRole("heading", { name: "Select one of the following:"});
    const postHeader = screen.getByRole("heading", { name: "Posts" });

    userEvent.click(postHeader);
    expect(promptHeader).not.toBeInTheDocument();
    expect(screen.getByText(postMock[0].title)).toBeInTheDocument();
    expect(screen.getByText(postMock[1].title)).toBeInTheDocument();
  });

  test('user click on "Comments renders comments to the page"', () => {

    render(
      <ViewContributions 
        currentUser={currentUserMock}
        toggleViewContributionsPage={toggleViewContributionsPageMock}
      />
    );

    const promptHeader = screen.getByRole("heading", { name: "Select one of the following:"});
    const commentsHeader = screen.getByRole("heading", { name: "Comments" });

    userEvent.click(commentsHeader);
    expect(promptHeader).not.toBeInTheDocument();
    expect(screen.getByText(commentsMock[0].comment)).toBeInTheDocument();
    expect(screen.getByText(commentsMock[1].comment)).toBeInTheDocument();

  });

  test('user click on "Favorites" renders the favorites to the page', () => {

    render(
      <ViewContributions 
        currentUser={currentUserMock}
        toggleViewContributionsPage={toggleViewContributionsPageMock}
      />
    );

    const promptHeader = screen.getByRole("heading", { name: "Select one of the following:"});
    const favoritesHeader = screen.getByRole("heading", { name: "Favorites" });

    userEvent.click(favoritesHeader);
    expect(promptHeader).not.toBeInTheDocument();
    expect(screen.getByText(favoritesMock[0].title)).toBeInTheDocument();
    expect(screen.getByText(favoritesMock[1].title)).toBeInTheDocument();

  });

});