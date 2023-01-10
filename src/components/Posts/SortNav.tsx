import React, { useState, FC } from "react";
import dropDown from '../../assets/chevron-down.svg';
import { SortNavProps } from '../../types/interfaces';
import '../../styles/Posts/SortNav.css';

const SortNav: FC<SortNavProps> = (props): JSX.Element => {

  const { handleSortChange, sortType } = props;

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
    handleSortChange(type);
  };

  if (dropDownMenu.open === false) {
    return (
      <div className="sort-by-container" onClick={handleSortClick} >
        <p className="sort-by-text">Sort by:</p>
        <img className="sort-menu-drop-down"
          src={dropDown}
          alt="chevron arrow"
          style={{width: "4vw", height: "4vh"}}
          onClick={handleSortClick} >
        </img>
        <button type="button"
          className="sort-by-new"
          onClick={() => handleSortType(sortType.type) }>
          {sortType.type}
        </button>
      </div>
    );
  };
  

  if (dropDownMenu.open === true) {
    return (
      <div className="sort-by-container" onClick={handleSortClick} >
        <p className="sort-by-text">Sort by:</p>
        <img className="sort-menu-drop-down"
          src={dropDown}
          alt="chevron arrow"
          style={{width: "4vw", height: "4vh"}}
          onClick={handleSortClick} >
        </img>
        <button type="button"
          className="sort-by-button"
          onClick={() => handleSortType("New")}>
          New
        </button>
        <button type="button"
          className="sort-by-button"
          onClick={() => handleSortType("Hot")} >
          Hot
        </button>
        <button type="button"
          className="sort-by-button"
          onClick={() => handleSortType("Contributed")} >
          Contributed
        </button>
        <button type="button"
          className="sort-by-button"
          onClick={() => handleSortType("Controversial")} >
          Controversial
        </button>
      </div>
    );
  };

  return (
    <p>Error, please try again</p>
  )
};

export default SortNav;