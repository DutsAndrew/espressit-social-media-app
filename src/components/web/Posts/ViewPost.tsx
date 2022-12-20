import React, { FC } from "react";
import { ViewPostProps } from "../../../types/interfaces";

const ViewPost: FC<ViewPostProps> = (props): JSX.Element => {

  const { viewing } = props

  console.log(viewing);

  return (
    <p>Viewing a Post</p>
  );
};

export default ViewPost;