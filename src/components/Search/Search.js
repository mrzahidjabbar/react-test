import React from "react";

import './Search.scss';

const Search = (props) => {
  const { handleLoginChange, handleSearch } = props;
  return (
    <>
      <form onSubmit={handleSearch} className="form-wrapper">
        <input type='search' onChange={handleLoginChange} placeholder="Search" className="search-input"/>
        <input type='submit' value='Search' className="search-button"/>
      </form>
    </>
  );
};

export default Search;
