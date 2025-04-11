const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    if (totalPages <= 1) return null;
    return (
      <div className="mt-6 flex justify-center gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;
  