const Pagination = ({ totalPages, currentPage, onPageChange }) => (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
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
  
  export default Pagination;
  