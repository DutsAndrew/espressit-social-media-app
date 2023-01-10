import { render, screen, act } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ViewNav from 'components/Posts/ViewNav';
import { User } from 'firebase/auth';

describe('unit tests for ViewNav component', () => {

  const postMock = {
    title: "Rant: Specialty Cafés should really train their baristas well",
    body: "I just had possibly one of the worst cups of filters in my life. I ordered a cup of Ethiopian coffee from a new specialty cafe that opened up near me. I was quite excited since the next closest one was around 7 km away. I saw that they had a gooseneck kettle and a V60, so I thought it couldn’t be that bad. The barista haphazardly chucked a heaped measuring cup full of coarse coffee into the V60. Then they poured all the water straight into the V60. The result was an overly hot cup, completely lacking in complexity, with an extremely unpleasant sourness, not acidity, but sourness. It was really a let down.",
    account: "usernameis2",
    link: "",
    img: "",
    time: "3 days ago",
    views: 1200,
    likes: 432,
    dislikes: 108,
    whoLiked: [
      "disneyscoffee", "noodelsaregood", "mario"
    ],
    whoDisliked: [
      "usernameis1"
    ],
    comments: [
      {
        account: "darthmeowcakes",
        time: "14 hr. ago",
        comment: "I get the let down but this is every single industry ever. People should be trained properly and (this one gets forgotten a lot) management should support the workers not cutting corners and continuing education.",
        likes: 282,
        dislikes: 0,
        whoLiked: [
          "disneyscoffee", "noodelsaregood", "mario"
        ],
        whoDisliked: [
          "usernameis1"
        ],
      },
      {
        account: "disneyscoffee",
        time: "9 hr. ago",
        comment: "As a teacher (and former barista), I will say that even when given multiple opportunities to advance one's skills and training, there are a growing number of people who simply don't care enough about what they learn in training to actually apply it consistently or at all. Those who do care tend to pour their hearts into their craft, but apathy is more common than passion.",
        likes: 86,
        dislikes: 96,
        whoLiked: [
          "disneyscoffee", "noodelsaregood", "mario"
        ],
        whoDisliked: [
          "usernameis1"
        ],
      },
      {
        account: "noodelsaregood",
        time: "17 hr. ago",
        comment: "If the Barista isn't well trained, it's not a speciality coffee shop... It's a money grab...",
        likes: 509,
        dislikes: 105,
        whoLiked: [
          "disneyscoffee", "noodelsaregood", "mario"
        ],
        whoDisliked: [
          "usernameis1"
        ],
      },
    ],
  };

  const handleUpVoteMock = jest.fn();
  const handleDownVoteMock = jest.fn();
  const handleFavoritePostMock = jest.fn();
  const handleStopViewingPostMock = jest.fn();
  let userMock: User

  test('renders basic elements on load', () => {

    render(
      <ViewNav 
        user={userMock}
        viewing={postMock}
        handleUpVotePost={handleUpVoteMock}
        handleDownVotePost={handleDownVoteMock}
        handleFavoritePost={handleFavoritePostMock}
        handleStopViewingPost={handleStopViewingPostMock}
      />
    );

    expect(screen.getByText("Close")).toBeInTheDocument();
    
  });

  test('user click on upvote or downvote, calls functions to handle them', () => {

    render(
      <ViewNav 
        user={userMock}
        viewing={postMock}
        handleUpVotePost={handleUpVoteMock}
        handleDownVotePost={handleDownVoteMock}
        handleFavoritePost={handleFavoritePostMock}
        handleStopViewingPost={handleStopViewingPostMock}
      />
    );

    const upVotePost = screen.getByTestId("post-upvote-test");
    userEvent.click(upVotePost);
    expect(handleUpVoteMock).toHaveBeenCalled();

    const downVotePost = screen.getByTestId("post-downvote-test");
    userEvent.click(downVotePost);
    expect(handleDownVoteMock).toHaveBeenCalled();

  });

  test('user click on favorite calls function to handleFavoritePost', () => {

    render(
      <ViewNav 
        user={userMock}
        viewing={postMock}
        handleUpVotePost={handleUpVoteMock}
        handleDownVotePost={handleDownVoteMock}
        handleFavoritePost={handleFavoritePostMock}
        handleStopViewingPost={handleStopViewingPostMock}
      />
    );

    const favoritePost = screen.getByTestId("post-favorite-test");
    userEvent.click(favoritePost);
    expect(handleFavoritePostMock).toHaveBeenCalled();

  });

  test('user click on close View Post calls handleStopViewingPost', () => {

    render(
      <ViewNav 
        user={userMock}
        viewing={postMock}
        handleUpVotePost={handleUpVoteMock}
        handleDownVotePost={handleDownVoteMock}
        handleFavoritePost={handleFavoritePostMock}
        handleStopViewingPost={handleStopViewingPostMock}
      />
    );

    const stopViewing = screen.getByTestId("post-close-test");
    userEvent.click(stopViewing);
    expect(handleStopViewingPostMock).toHaveBeenCalled();
  });

});