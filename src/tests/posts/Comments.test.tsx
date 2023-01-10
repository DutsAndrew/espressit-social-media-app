import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Comments from 'components/Posts/Comments';
import { User } from 'firebase/auth';

describe('unit test for Comments', () => {

  const viewingMock = {
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
        dislikes: 2,
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
  let userMock: User;

  test('comment information is displayed', () => {

    render(
      <Comments 
        user={userMock}
        viewing={viewingMock}
        commentList={commentMock}
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
      <Comments 
        user={userMock}
        viewing={viewingMock}
        commentList={commentMock}
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