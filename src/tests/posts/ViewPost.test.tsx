import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ViewPost from "../../components/web/Posts/ViewPost";
import { User } from 'firebase/auth';

describe('unit tests for ViewPost', () => {

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
  const handleFavoriteMock = jest.fn();
  const handleStopViewingPostMock = jest.fn();
  const handleUpVoteCommentMock = jest.fn();
  const handleDownVoteCommentMock = jest.fn();
  let userMock: User;

  test('post information is displayed', () => {

    render(
      <ViewPost 
        user={userMock}
        viewing={postMock}
        handleUpVotePost={handleUpVoteMock}
        handleDownVotePost={handleDownVoteMock}
        handleFavoritePost={handleFavoriteMock}
        handleStopViewingPost={handleStopViewingPostMock}
        handleUpVoteComment={handleUpVoteCommentMock}
        handleDownVoteComment={handleDownVoteCommentMock}
      />
    );

    // post information is displayed
    expect(screen.getByRole("heading", { name: "Rant: Specialty Cafés should really train their baristas well"})).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "I just had possibly one of the worst cups of filters in my life. I ordered a cup of Ethiopian coffee from a new specialty cafe that opened up near me. I was quite excited since the next closest one was around 7 km away. I saw that they had a gooseneck kettle and a V60, so I thought it couldn’t be that bad. The barista haphazardly chucked a heaped measuring cup full of coarse coffee into the V60. Then they poured all the water straight into the V60. The result was an overly hot cup, completely lacking in complexity, with an extremely unpleasant sourness, not acidity, but sourness. It was really a let down."})).toBeInTheDocument();
    expect(screen.getByText(/usernameis2/i)).toBeInTheDocument();
    expect(screen.getByText(/3 days ago/i)).toBeInTheDocument();

    // is the post upvote/downvote counts displayed?
    expect(screen.getByText(324)).toBeInTheDocument();
  });

  test('if dislikes are present, likes do not show negative', () => {

    render(
      <ViewPost 
        user={userMock}
        viewing={postMock}
        handleUpVotePost={handleUpVoteMock}
        handleDownVotePost={handleDownVoteMock}
        handleFavoritePost={handleFavoriteMock}
        handleStopViewingPost={handleStopViewingPostMock}
        handleUpVoteComment={handleUpVoteCommentMock}
        handleDownVoteComment={handleDownVoteCommentMock}
      />
    );
    
    // second comment in mock should show this behavior
    expect(screen.getByText(0)).toBeInTheDocument();

  });

  test('views of post are displayed', () => {

    render(
      <ViewPost 
        user={userMock}
        viewing={postMock}
        handleUpVotePost={handleUpVoteMock}
        handleDownVotePost={handleDownVoteMock}
        handleFavoritePost={handleFavoriteMock}
        handleStopViewingPost={handleStopViewingPostMock}
        handleUpVoteComment={handleUpVoteCommentMock}
        handleDownVoteComment={handleDownVoteCommentMock}
      />
    );
    
    expect(screen.getByText(/1200 Views/i)).toBeInTheDocument();

  });
  
});