import React, { useEffect, useState } from "react";
import axios from "axios";

//custom imports
import { Search, Results } from "./components";
import "./App.scss";

function App() {
  const [login, setLogin] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
 

  useEffect(() => {
    handleSeacrch()
  }, [currentPage]);

  const handleLoginChange = (e) => {
    const value = e.target.value;
    setLogin(value);
  };
  const handleSeacrch = async (e) => {
    e?.preventDefault();
    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${login}&sort=login&order=asc&page=${currentPage}&per_page=9`
      );
      
      //for pagination
      const link = res.headers.link;
      const urls = link.split(",");
      urls.forEach((a) => {
        if (a.split(";")[1].split("=")[1] === `"last"`) {
          const url = a.split(";")[0].replace(">", "").replace("<", "");
          const link = new URL(url);
          const total_pages = link.searchParams.get("page");
          setTotalPages(Number(total_pages));
        }
      });
      setResults(res.data.items);
    } catch (e) {
      //handle error
      console.log(e);
    }
  };
  const handlePreviosPage = () => {
    setCurrentPage(( currentPage ) => currentPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage(( currentPage ) => currentPage + 1);
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className='app-wrapper'>
      <Search
        handleLoginChange={handleLoginChange}
        handleSeacrch={handleSeacrch}
      />
      {results.length ? (
        <Results
          results={results}
          currentPage = {currentPage}
          totalPages ={totalPages}
          handlePreviosPage={handlePreviosPage}
          handleNextPage={handleNextPage}
          handleFirstPage={handleFirstPage}
          handleLastPage={handleLastPage}
        />
      ) : (
        <p>Search in the above field to find GitHub users</p>
      )}
    </div>
  );
}

export default App;
