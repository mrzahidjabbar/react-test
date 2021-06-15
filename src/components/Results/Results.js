import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";

import LoaderSpinner from "../common/Loader";
import "./Results.scss";

const Avatar = (url) => (
  <img
    src={url.value}
    height='auto'
    width='30'
    className='avatar'
    alt='avatar'
  />
);

const Results = (props) => {
  const {
    results,
    handleNextPage,
    handlePreviousPage,
    handleFirstPage,
    handleLastPage,
    currentPage,
    isLoading,
    totalPages
  } = props;

  const columns = useMemo(
    () => [
      {
        Header: "Sr.",
        accessor: "serial"
      },
      {
        Header: "Avatar",
        accessor: "avatar_url",
        disableSortBy: true,
        Cell: ({ cell: { value } }) => <Avatar value={value} />
      },
      {
        Header: "Login",
        accessor: "login",
        sortDescFirst: "true"
      },
      {
        Header: "Type",
        accessor: "type"
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: results,
        initialState: { sortBy: [{ id: "login", desc: false }] }
      },
      useSortBy
    );

  return (
    <>
      <div className='table-wrapper'>
        <LoaderSpinner loaded={!isLoading}>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "  🔽"
                            : "  🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className='row-data'>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='pagination'>
            <div className='page-count'>
              Page
              <strong>
                {" "}
                {currentPage} of {totalPages}
              </strong>
            </div>
            <div>
              <button
                className='first-page-button'
                onClick={() => handleFirstPage()}
                disabled={currentPage === 1 || isLoading}
              >
                First
              </button>{" "}
              <button
                className='pre-page-button'
                onClick={() => handlePreviousPage()}
                disabled={currentPage === 1 || isLoading}
              >
                Prev
              </button>{" "}
              <button
                className='next-page-button'
                onClick={() => handleNextPage()}
                disabled={currentPage === totalPages || isLoading}
              >
                Next
              </button>{" "}
              <button
                className='last-page-button'
                onClick={() => handleLastPage()}
                disabled={currentPage === totalPages || isLoading}
              >
                Last
              </button>
            </div>
          </div>
        </LoaderSpinner>
      </div>
    </>
  );
};

export default Results;
