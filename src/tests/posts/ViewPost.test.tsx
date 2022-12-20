import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ViewPost from "../../components/web/Posts/ViewPost";

describe('unit tests for ViewPost', () => {

  const postMock = {
    post: {
      title: "Rant: Specialty Cafés should really train their baristas well",
      body: "I just had possibly one of the worst cups of filters in my life. I ordered a cup of Ethiopian coffee from a new specialty cafe that opened up near me. I was quite excited since the next closest one was around 7 km away. I saw that they had a gooseneck kettle and a V60, so I thought it couldn’t be that bad. The barista haphazardly chucked a heaped measuring cup full of coarse coffee into the V60. Then they poured all the water straight into the V60. The result was an overly hot cup, completely lacking in complexity, with an extremely unpleasant sourness, not acidity, but sourness. It was really a let down.",
      account: "usernameis2",
      time: "3 days ago",
      views: 1200,
      likes: 400,
      dislikes: 100,
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
          dislikes: 609,
          whoLiked: [
            "disneyscoffee", "noodelsaregood", "mario"
          ],
          whoDisliked: [
            "usernameis1"
          ],
        },
      ],
    },
  };

  test('post information is displayed', () => {
    render(<ViewPost viewing={postMock} />);

    // post information is displayed
    expect(screen.getByRole("heading", { name: "Rant: Specialty Cafés should really train their baristas well"})).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "I just had possibly one of the worst cups of filters in my life. I ordered a cup of Ethiopian coffee from a new specialty cafe that opened up near me. I was quite excited since the next closest one was around 7 km away. I saw that they had a gooseneck kettle and a V60, so I thought it couldn’t be that bad. The barista haphazardly chucked a heaped measuring cup full of coarse coffee into the V60. Then they poured all the water straight into the V60. The result was an overly hot cup, completely lacking in complexity, with an extremely unpleasant sourness, not acidity, but sourness. It was really a let down."})).toBeInTheDocument();
    expect(screen.getByText("usernameis2")).toBeInTheDocument();
    expect(screen.getByText("3 days ago")).toBeInTheDocument();
    expect(screen.getByText(324)).toBeInTheDocument();
    expect(screen.getByText(1200)).toBeInTheDocument();
  });

  test('comment information is displayed', () => {
    render(<ViewPost viewing={postMock} />);

    expect(screen.getByText("darthmeowcakes")).toBeInTheDocument();
    expect(screen.getByText("14 hr. ago")).toBeInTheDocument();
    expect(screen.getByText("I get the let down but this is every single industry ever. People should be trained properly and (this one gets forgotten a lot) management should support the workers not cutting corners and continuing education.")).toBeInTheDocument();
    expect(screen.getByText(282)).toBeInTheDocument();
  });

  test('if dislikes are present, likes do not show negative', () => {
    render(<ViewPost viewing={postMock} />);
    expect(screen.getByText(0)).toBeInTheDocument();
  });

  test('views of post are displayed', () => {
    render(<ViewPost viewing={postMock} />);
    expect(screen.getByText(1200)).toBeInTheDocument();
  });

  test('on user post upvote, post upvote count is changed', () => {
    render(<ViewPost viewing={postMock} />);

    const upVotePost = screen.getByTestId("post-upvote-test");
    userEvent.click(upVotePost);
    expect(screen.getByText(301)).toBeInTheDocument();
  });

  test('on user post downvote, post downvote count is changed', () => {
    render(<ViewPost viewing={postMock} />);

    const downVotePost = screen.getByTestId("post-downvote-test");
    userEvent.click(downVotePost);
    expect(screen.getByText(299)).toBeInTheDocument();
  });

  test('on user comment upvote, comment upvote count is changed', () => {
    render(<ViewPost viewing={postMock} />);

    const upVoteComment = screen.getByTestId("comment-upvote-test");
    userEvent.click(upVoteComment);
    expect(screen.getByText(283)).toBeInTheDocument();
  });

  test('on user post downvote, comment downvote count is changed', () => {
    render(<ViewPost viewing={postMock} />);

    const downVoteComment = screen.getByTestId("comment-downvote-test");
    userEvent.click(downVoteComment);
    expect(screen.getByText(281)).toBeInTheDocument();
  });

  test('user can type in add comment box', () => {
    render(<ViewPost viewing={postMock} />);

    const addCommentBox = screen.getByPlaceholderText("Add Comment");
    expect(addCommentBox).toBeInTheDocument();
    userEvent.type(addCommentBox, "I disagree");
    expect(screen.getByDisplayValue("I disagree")).toBeInTheDocument();
  });

  test('user comment on submit is added to comment list', () => {
    render(<ViewPost viewing={postMock} />);

    const addCommentBox = screen.getByPlaceholderText("Add Comment");
    userEvent.type(addCommentBox, "I disagree");

    const submitComment = screen.getByRole("button", { name: "Submit Comment" })
    expect(submitComment).toBeInTheDocument();
    userEvent.click(submitComment);
    
    expect(screen.getByText('I disagree')).toBeInTheDocument();
  });
  
});