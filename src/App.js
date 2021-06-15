import React, { useEffect, useState } from "react";
import axios from "axios";

//custom imports
import { Search, Results } from "./components";
import "./App.scss";

const pageCount = 9;
function App() {
  const [login, setLogin] = useState("");
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    if (search) handleSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setSearch(false);
  }, [login]);

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://api.github.com/search/users?q=${login}&sort=login&order=asc&page=${currentPage}&per_page=9`
      );
      setSearch(true);
      let items = res.data.items.map((item, index) => ({
        ...item,
        serial: (currentPage - 1) * pageCount + (index + 1)
      }));
      setResults(items);
      setIsLoading(false);

      const link = res.headers.link;

      if (!link) {
        setCurrentPage(1);
        setTotalPages(1);
        return;
      }

      const urls = link.split(",");
      urls.forEach((a) => {
        if (a.split(";")[1].split("=")[1] === `"last"`) {
          const url = a.split(";")[0].replace(">", "").replace("<", "");
          const link = new URL(url);
          const total_pages = link.searchParams.get("page");
          setTotalPages(Number(total_pages));
        }
      });
    } catch (error) {
      //handle error 
      setError("There was an error, please try again");
      setSearch(true);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleLoginChange = (e) => {
    const value = e.target.value;
    setLogin(value);
  };

  const handlePreviousPage = () => setCurrentPage((currentPage) => currentPage - 1)
  const handleNextPage = () =>   setCurrentPage((currentPage) => currentPage + 1);
  const handleFirstPage = () =>setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);

  return (
    <div className='app-wrapper'>
      <h2 className="header-text">GitHub Search API</h2>
      <Search
        handleLoginChange={handleLoginChange}
        handleSearch={handleSubmit}
      />
      {!!error ? (
        <p>{error}</p>
      ) : results.length > 0 ? (
        <Results
          results={results}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          handleFirstPage={handleFirstPage}
          handleLastPage={handleLastPage}
          isLoading={isLoading}
        />
      ) : (
        <p className="no-results-msg">{(login && search) ? "No results found, please search again!" : ""}</p>
      )}
    </div>
  );
}

export default App;
