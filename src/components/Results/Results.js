import React, { useMemo, useEffect } from "react";
import { useTable } from "react-table";

import "./Results.scss";

const Avatar = (url) => (
  <img
    src={url.values}
    height='auto'
    width='30'
    className='avatar'
    alt='avatar'
  />
);

const Results = (props) => {
  const { results, handleNextPage, handlePreviosPage, handleFirstPage, handleLastPage, currentPage, totalPages } = props;
  useEffect(() => {
    console.log({ results });
  }, [results]);
  const columns = useMemo(
    () => [
      {
        Header: "Avatar",
        accessor: "avatar_url",
        Cell: ({ cell: { value } }) => <Avatar values={value} />
      },
      {
        Header: "Login",
        accessor: "login",
        sortMethod: (a, b) => {
            console.log('sortMethod')
            if (a.length === b.length) {
              return a > b ? 1 : -1;
            }
            return a.length > b.length ? 1 : -1;
          }
      },
      {
        Header: "Type",
        accessor: "type"
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data: results },
    
  );

  return (
    <>
      <div className='table-wrapper'>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
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
          <div className="page-count">
            Page{" "}
            <strong>
              {" "}
              {currentPage} of {totalPages}{" "}
            </strong>{" "}
          </div>
          <div>
            <button onClick={() => handleFirstPage()} disabled={currentPage === 1}>
              First
            </button>{" "}
            <button onClick={() => handlePreviosPage()} disabled={currentPage === 1} >
              Previos
            </button>{" "}
            <button onClick={() => handleNextPage()} disabled={currentPage === totalPages}>
              Next
            </button>{" "}
            <button
              onClick={() => handleLastPage()}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
