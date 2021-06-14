import React from "react";

import './Search.scss';

const Search = (props) => {
  const { handleLoginChange, handleSeacrch } = props;
  return (
    <>
      <form onSubmit={handleSeacrch} className="form-wrapper">
        <input type='text' onChange={handleLoginChange} className="search-input"/>
        <input type='submit' value='Search'/>
      </form>
    </>
  );
};

export default Search;
