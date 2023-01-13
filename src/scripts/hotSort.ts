import { Post } from "types/interfaces";

export default function hotSort(postsArray: any[]): any[] {

  const sortedArray = postsArray.sort((post1: Post, post2: Post): number => {

    if (post1.likes > post2.likes) {
      return -1;
    };

    if (post2.likes > post1.likes) {
      return 1;
    };

    return 0;

  });

  return sortedArray;

};