import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Comments from '../../components/web/Posts/Comments';

describe('unit test for Comments', () => {

  const commentMock = [
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
  ];

  const handleUpVoteMock = jest.fn();
  const handleDownVoteMock = jest.fn();

  test('comment information is displayed', () => {

    render(
      <Comments commentList={commentMock}
        handleUpVoteComment={handleUpVoteMock}
        handleDownVoteComment={handleDownVoteMock}
      />
    );

    expect(screen.getByText("darthmeowcakes")).toBeInTheDocument();
    expect(screen.getByText("14 hr. ago")).toBeInTheDocument();
    expect(screen.getByText("I get the let down but this is every single industry ever. People should be trained properly and (this one gets forgotten a lot) management should support the workers not cutting corners and continuing education.")).toBeInTheDocument();
    expect(screen.getByText(282)).toBeInTheDocument();

  });

  test('upvote/downvote reactions call appropriate functions', () => {

    render(
      <Comments commentList={commentMock}
        handleUpVoteComment={handleUpVoteMock}
        handleDownVoteComment={handleDownVoteMock}
      />
    );

    const upVote = screen.getAllByTestId("upvote-test")[0];
    userEvent.click(upVote);

    const downVote = screen.getAllByTestId("downvote-test")[0];
    userEvent.click(downVote);

    expect(handleUpVoteMock).toHaveBeenCalled();
    expect(handleDownVoteMock).toHaveBeenCalled();

  });

});