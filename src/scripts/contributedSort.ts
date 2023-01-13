import { User } from "firebase/auth";
import { Post } from "types/interfaces";

export default function contributedSort(postsArray: any[], user: string | User): any[] {

  const sortedArray = postsArray.sort((post1: Post, post2: Post): number => {

    const userRef = user as User;

    const whoLiked1 = post1.whoLiked;
    const whoDisliked1 = post1.whoDisliked;
    const commented1 = post1.comments;

    const whoLiked2 = post2.whoLiked;
    const whoDisliked2 = post2.whoDisliked;
    const commented2 = post2.comments;

    let isUserInComments1: boolean = false;
    let isUserInComments2: boolean = false;

    commented1.forEach((comment) => {
      if (comment.author === userRef.uid) {
        isUserInComments1 = true;
        return;
      };
    });

    commented2.forEach((comment) => {
      if (comment.author === userRef.uid) {
        isUserInComments2 = true;
        return;
      };
    });

    if ((isUserInComments1 as any) === true) return -1;

    if ((isUserInComments2 as any) === true) return 1;

    if (whoLiked1.includes(userRef.uid) || whoDisliked1.includes(userRef.uid)) return -1;
    
    if (whoLiked2.includes(userRef.uid) || whoDisliked2.includes(userRef.uid)) return 1;
    
    return 0;

  });

  return sortedArray;

};