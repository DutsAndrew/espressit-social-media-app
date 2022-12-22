import React, { useEffect, useState, FC } from "react";
import Feed from "./Feed";
import SortNav from "./SortNav";
import '../../../styles/Posts.css';
import timeSort from "../../../scripts/timeSort";
import ViewPost from "./ViewPost";
import { Post, PostProps } from "../../../types/interfaces";

const Posts: FC<PostProps> = (props): JSX.Element => {

  const { user } = props;

  // fetch posts from db
  // sort db based on sortType
  // create map function to map sortedData to feed
    // listeners for each post
      // upvote and downvote clicks
      // comment, and favorite clicks
      // comment click will auto trigger viewComment
      // any click on post will send user to viewPost version of post
      // there will be no share click to avoid potential problem with page linking and db query issues

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

  // sort by new on default
  const [sortType, setSortType] = useState({type: "New"});

  const [sortedData, setSortedData] = useState({
    data: fakePosts,
  });

  const handleSortChange = (type: string): void => {
    setSortType({
      type: type
    });
  };

  // handles when user wants to view a post
  const [currentlyViewing, setCurrentlyViewing] = useState({
    post: {},
  });

  const handleViewPost = (index: number): void => {
    setCurrentlyViewing({
      post: sortedData.data[index],
    });
  };

  const handleStopViewingPost = (): void => {
    setCurrentlyViewing({
      post: {},
    });
  };

  const handleFavoritePost = (post: Post): void => {
    console.log('favoriting:', post);
  };

  const handleUpVotePost = (post: Object): void => {
    const dataRef = sortedData.data;
    const indexRef = dataRef.indexOf(post as any);

    let postToChange = dataRef[indexRef];
    postToChange.likes += 1;
    dataRef[indexRef] = postToChange;

    setSortedData({
      data: dataRef,
    });
  };

  const handleDownVotePost = (post: Object): void => {
    const dataRef = sortedData.data;
    const indexRef = dataRef.indexOf(post as any);

    let postToChange = dataRef[indexRef];
    postToChange.likes -= 1;
    dataRef[indexRef] = postToChange;

    setSortedData({
      data: dataRef,
    });
  };

  const handleUpVoteComment = (comment: Object): void => {

  };

  const handleDownVoteComment = (comment: Object): void => {

  };
 
  // (function fakeDates () {
  //   const dateArray: any[] = [];
  //   const date1: any = new Date().toLocaleString();
  
  //   dateArray.push(date1);

  //   setTimeout(() => {
  //     const date2 = new Date().toLocaleString();
  //     dateArray.push(date2);
  //   }, 1000);

  //   const date3 = new Date(1995, 8, 17, 3, 24, 10).toLocaleString();
  //   const date4 = new Date(2022, 10, 3, 10, 3, 8).toLocaleString();
  //   dateArray.push(date3, date4);

  //   const results = timeSort(dateArray);
  // })();

  // useEffect(() => {
  //   console.log(currentlyViewing);
  // }, [currentlyViewing]);

  // if a post isn't being viewed return feed
  if (Object.keys(currentlyViewing.post).length === 0) {
    return (
      <div className="posts-container" >
        <SortNav handleSortChange={handleSortChange}
          sortType={sortType}
        />
        <Feed sortedData={sortedData.data}
          handleViewPost={handleViewPost}
          handleUpVotePost={handleUpVotePost}
          handleDownVotePost={handleDownVotePost}
          handleFavoritePost={handleFavoritePost}
        />
      </div>
    );
  } else {
    return (
      <ViewPost viewing={currentlyViewing.post}
        handleUpVotePost={handleUpVotePost}
        handleDownVotePost={handleDownVotePost}
        handleFavoritePost={handleFavoritePost}
        handleStopViewingPost={handleStopViewingPost}
        handleUpVoteComment={handleUpVoteComment}
        handleDownVoteComment={handleDownVoteComment}
      />
    );
  };
};

export default Posts;