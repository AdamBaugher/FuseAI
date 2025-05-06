import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  // If there's no pagination (totalPages <= 1 or -1), don't render the pagination component
  if (totalPages !== -1 && totalPages <= 1) return null;

  // Function to determine the page numbers to be displayed
  const getPageNumbers = () => {
    const pages = [];

    // Show '1' if the current page is greater than 3
    if (page > 3) pages.push(1);

    // Show ellipsis if the current page is greater than 4
    if (page > 4) pages.push("...");

    // Add the surrounding pages, i.e., 2 pages before and after the current page
    for (let i = Math.max(1, page - 2); i <= Math.min(Math.max(totalPages, page), page + 2); i++) {
      pages.push(i);
    }

    // Show ellipsis if the current page is far from the last page
    if (page < totalPages - 3) pages.push("...");

    // Show the last page if the current page is less than 3 pages away from it
    if (page < totalPages - 2) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex gap-2 justify-center mt-4 flex-wrap">
      {/* Button to go to the first page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={page === 1} // Disabled if already on the first page
        className="px-2 py-1 cursor-pointer border rounded disabled:opacity-50"
      >
        First
      </button>

      {/* Button to go to the previous page */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1} // Disabled if already on the first page
        className="px-2 py-1 cursor-pointer border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {/* Dynamically render page numbers or ellipses */}
      {getPageNumbers().map((p, index) =>
        p === "..." ? (
          <span key={index} className="px-2 py-1">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 cursor-pointer border rounded ${p === page ? "bg-blue-500 text-white" : ""}`}
          >
            {p}
          </button>
        )
      )}

      {/* Button to go to the next page */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages || totalPages === 0} // Disabled if already on the last page
        className="px-2 py-1 cursor-pointer border rounded disabled:opacity-50"
      >
        Next
      </button>

      {/* Button to go to the last page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages || totalPages < 1} // Disabled if already on the last page or no pages exist
        className="px-2 py-1 cursor-pointer border rounded disabled:opacity-50"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
