import React from "react";

const PageNav = ({numImages, currentPage, onClick}) => {
  const pageArray = new Array(Math.ceil(numImages / 12)).fill(0);

  return (
    <div>
      {pageArray.map((val, i) => <span>
        <span>&nbsp;&nbsp;</span>
        {i + 1 === currentPage
          ? <span>{i + 1}</span>
          : <a onClick={onClick}>{i + 1}</a>}
        <span>&nbsp;&nbsp;</span>
      </span>)}
    </div>
  );
};

export default PageNav;
