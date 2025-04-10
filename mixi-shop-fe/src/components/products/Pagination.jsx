const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;
  
    return (
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onPageChange(idx + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === idx + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;
  