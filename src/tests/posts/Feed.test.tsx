import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Feed from "../../components/web/Posts/Feed";
import { User } from 'firebase/auth';

describe('unit tests for Feed', () => {

  const fakePosts = [
    {
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
    },
    {
      title: "Need some advice, first time venturing into speciality coffee",
      body: "I've just bought my first Aeropress and have made the decision to slowly venture into the coffee world in aims of brewing nicer coffee, and so far it has been an interesting journey I'm learning quite a lot. However interestingly, I have found that there is a lot of terminology used that isn't really explained properly anywhere and just sort of assumes that you know it. Admittedly, I mainly hear this terminology from watching James Hoffmans videos, but I wanted to ask if anyone knows any sources I can go or perhaps a youtuber than explains all the commonly used coffee terminology such as: bloom, drawdown, immersion, percolation, steep, agitation and so on so forth. On another note: This has been asked quite a lot I'm aware, but what is your current go-to roaster or choice of beans? I'm overwhelmed for choice at the moment and not sure how to differentiate. Location is UK, London and I don't have a local roaster/cafe that I can try so it will be an online order. Appreciate the help!",
      account: "usernameis1",
      link: "",
      img: "",
      time: "4 hr. ago",
      views: 201,
      likes: 73,
      dislikes: 12,
      whoLiked: [
        "disneyscoffee", "noodelsaregood", "mario"
      ],
      whoDisliked: [
        "usernameis1"
      ],
      comments: [
        {
          account: "2basnes",
          time: "51 min. ago",
          comment: "Start using your gear. Everything that is important will become clear soon enough, everything else is just a noise.",
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
    },
  ];

  const viewPostMock = jest.fn();
  const handleUpVoteMock = jest.fn();
  const handleDownVoteMock = jest.fn();
  const handleFavoriteMock = jest.fn();
  let userMock: User;

  test('renders all upvote, downvote, comment, and save svgs for two posts', () => {

    render(
      <Feed 
        user={userMock}
        sortedData={fakePosts}
        handleViewPost={viewPostMock}
        handleUpVotePost={handleUpVoteMock}
        handleDownVotePost={handleDownVoteMock}
        handleFavoritePost={handleFavoriteMock}
      />
    );

    expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(8);

  });

  test('renders headers and body text for posts', () => {

    render(
      <Feed 
        user={userMock}
        sortedData={fakePosts}
        handleViewPost={viewPostMock}
        handleUpVotePost={handleUpVoteMock}
        handleDownVotePost={handleDownVoteMock}
        handleFavoritePost={handleFavoriteMock}
      />
    );

    expect(screen.getByRole("heading",
      { name: "Rant: Specialty Cafés should really train their baristas well"})
    ).toBeInTheDocument();

    expect(screen.getByRole("heading",
      { name: "I just had possibly one of the worst cups of filters in my life. I ordered a cup of Ethiopian coffee from a new specialty cafe that opened up near me. I was quite excited since the next closest one was around 7 km away. I saw that they had a gooseneck kettle and a V60, so I thought it couldn’t be that bad. The barista haphazardly chucked a heaped measuring cup full of coarse coffee into the V60. T..."})
    ).toBeInTheDocument();

    expect(screen.getByRole("heading",
      { name: "Need some advice, first time venturing into speciality coffee"})
    ).toBeInTheDocument();

    expect(screen.getByRole("heading",
      { name: "I've just bought my first Aeropress and have made the decision to slowly venture into the coffee world in aims of brewing nicer coffee, and so far it has been an interesting journey I'm learning quite a lot. However interestingly, I have found that there is a lot of terminology used that isn't really explained properly anywhere and just sort of assumes that you know it. Admittedly, I mainly hear t..."})
    ).toBeInTheDocument();

  });

  test('upvote calls handleUpVote on click', () => {

    render(
      <Feed 
        user={userMock}
        sortedData={fakePosts}
        handleViewPost={viewPostMock}
        handleUpVotePost={handleUpVoteMock}
        handleDownVotePost={handleDownVoteMock}
        handleFavoritePost={handleFavoriteMock}
      />
    );

    const upVoteArrow = screen.getAllByAltText("upvote arrow")[0];
    userEvent.click(upVoteArrow);

    expect(handleUpVoteMock).toHaveBeenCalled();

  });

  test('downvote calls handleDownVote on click', () => {

    render(
      <Feed 
        user={userMock}
        sortedData={fakePosts}
        handleViewPost={viewPostMock}
        handleUpVotePost={handleUpVoteMock}
        handleDownVotePost={handleDownVoteMock}
        handleFavoritePost={handleFavoriteMock}
      />
    );

    const downVoteArrow = screen.getAllByAltText("downvote arrow")[1];
    userEvent.click(downVoteArrow);

    expect(handleDownVoteMock).toHaveBeenCalled();

  });

  test('user click on comment SVG sends user to viewPost component', () => {

    render(
      <Feed 
        user={userMock}
        sortedData={fakePosts}
        handleViewPost={viewPostMock}
        handleUpVotePost={handleUpVoteMock}
        handleDownVotePost={handleDownVoteMock}
        handleFavoritePost={handleFavoriteMock}
      />
    );

    const commentBox = screen.getAllByAltText("comment box")[0];
    userEvent.click(commentBox);

    expect(viewPostMock).toHaveBeenCalled();

  });

  test('user click on favorite SVG calls handleFavorite on click', () => {

    render(
      <Feed 
        user={userMock}
        sortedData={fakePosts}
        handleViewPost={viewPostMock}
        handleUpVotePost={handleUpVoteMock}
        handleDownVotePost={handleDownVoteMock}
        handleFavoritePost={handleFavoriteMock}
      />
    );

    const saveIcon = screen.getAllByAltText("save icon")[0];
    userEvent.click(saveIcon);
    
    expect(handleFavoriteMock).toHaveBeenCalled();
    
  });
  
});