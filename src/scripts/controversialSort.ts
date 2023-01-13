import { Post } from "types/interfaces";

export default function controversialSort(postsArray: any[]): any[] {

  const sortedArray = postsArray.sort((post1: Post, post2: Post): number => {

    if (post1.dislikes > post2.dislikes) {
      return -1;
    };

    if (post2.dislikes > post1.dislikes) {
      return 1;
    }

    return 0;

  });

  return sortedArray;

};