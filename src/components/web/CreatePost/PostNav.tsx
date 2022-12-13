import React, { FC } from "react";
import imgSVG from '../../../assets/image.svg';
import linkSVG from '../../../assets/link.svg';
import tamper from '../../../assets/tamper.svg';
import { PostNavProps } from '../../../types/interfaces';

const PostNav: FC<PostNavProps> = (props): JSX.Element => {

  const { handlePostType } = props;

  return (
    <div className="create-post-container" >
      <img className="create-post-tamper-img" src={tamper} alt="profile"></img>
      <input className="create-post-text-input" onFocus={() => handlePostType({text: true})} placeholder="Title" ></input>
      <button type="button" className="create-post-insert-img"><img className="create-post-svg" src={imgSVG} alt="icon" onClick={() => handlePostType({img: true})} ></img></button>
      <button type="button" className="create-post-insert-link"><img className="create-post-svg" src={linkSVG} alt="icon" onClick={() => handlePostType({link: true})} ></img></button>
    </div>
  );
};

export default PostNav;