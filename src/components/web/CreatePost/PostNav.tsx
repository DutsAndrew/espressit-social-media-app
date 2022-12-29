import React, { FC } from "react";
import imgSVG from '../../../assets/image.svg';
import linkSVG from '../../../assets/link.svg';
import tamperSVG from '../../../assets/tamper.svg';
import textSVG from '../../../assets/text.svg';
import { PostNavProps } from '../../../types/interfaces';

const PostNav: FC<PostNavProps> = (props): JSX.Element => {

  const { handlePostType } = props;

  return (
    <div className="create-post-container" >
      <img className="create-post-tamper-img"
        src={tamperSVG}
        alt="profile">
      </img>
      <input className="create-post-text-input"
        onFocus={() => handlePostType({text: true})}
        placeholder="Title of Post" >
      </input>
      <button type="button" 
        className="create-post-insert-text">
        <img className="create-post-svg" 
          src={textSVG} 
          alt="text icon"
          onClick={() => handlePostType({text: true})}>
        </img>
      </button>
      <button type="button"
        className="create-post-insert-img">
        <img className="create-post-svg"
          src={imgSVG}
          alt=" img icon"
          onClick={() => handlePostType({img: true})} >
        </img>
      </button>
      <button type="button"
        className="create-post-insert-link">
        <img className="create-post-svg"
          src={linkSVG}
          alt="link icon"
          onClick={() => handlePostType({link: true})} >
        </img>
      </button>
    </div>
  );
};

export default PostNav;