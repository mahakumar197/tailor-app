import React, { useState } from "react";

const PaginationComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // Assume there are 10 pages in total
  const pagesToShow = 3; // Number of page buttons to show at a time

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Implement logic to fetch data for the selected page from an API
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <li
          key={page}
          className={`page-item ${currentPage === page ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageChange(page)}>
            {page}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={handlePrevPage}>
            Previous
          </button>
        </li>
        {renderPageNumbers()}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button className="page-link" onClick={handleNextPage}>
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default PaginationComponent;
