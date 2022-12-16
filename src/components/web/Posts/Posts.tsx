import React, { useState } from "react";
import Feed from "./Feed";
import dropDown from '../../../assets/chevron-down.svg';
import '../../../styles/Posts.css';

const Posts = (): JSX.Element => {

  // controller to use algorithms for sorting feed based on new, most popular, and posts that the user has contributed to

  const [sortType, setSortType] = useState({type: "New"});

  const [dropDownMenu, setDropDownMenu] = useState({open: false});

  const handleSortClick = (): void => {
    const sortDropDown = document.querySelector('.sort-menu-drop-down');
    if (dropDownMenu.open === true) {
      setDropDownMenu({
        open: false
      });
      sortDropDown?.classList.remove('sort-drop-down-open');
      return;
    };
    if (dropDownMenu.open === false) {
      setDropDownMenu({
        open: true
      });
      sortDropDown?.classList.add('sort-drop-down-open');
      return;
    };
  };

  const handleSortType = (type: string): void => {
    setDropDownMenu({
      open: false
    });
    setSortType({
      type: type
    });
  };

  if (dropDownMenu.open === false) {
    return (
      <div className="posts-container" >
        <div className="sort-by-container" onClick={handleSortClick} >
          <p className="sort-by-text">Sort by:</p>
          <img className="sort-menu-drop-down" src={dropDown} alt="chevron arrow" style={{width: "4vw", height: "4vh"}} onClick={handleSortClick} ></img>
          <button type="button" className="sort-by-new" onClick={() => handleSortType(sortType.type) }>{sortType.type}</button>
        </div>
        <Feed sortType={sortType.type} />
      </div>
    );
  };
  

  if (dropDownMenu.open === true) {
    return (
      <div className="posts-container" >
        <div className="sort-by-container" onClick={handleSortClick} >
          <p className="sort-by-text">Sort by:</p>
          <img className="sort-menu-drop-down" src={dropDown} alt="chevron arrow" style={{width: "4vw", height: "4vh"}} onClick={handleSortClick} ></img>
          <button type="button" className="sort-by-button" onClick={() => handleSortType("New")} >New</button>
          <button type="button" className="sort-by-button" onClick={() => handleSortType("Hot")} >Hot</button>
          <button type="button" className="sort-by-button" onClick={() => handleSortType("Contributed")} >Contributed</button>
          <button type="button" className="sort-by-button" onClick={() => handleSortType("Controversial")} >Controversial</button>
        </div>
        <Feed sortType={sortType.type} />
      </div>
    );
  };

  return (
    <p>Error, please try again</p>
  );
};

export default Posts;