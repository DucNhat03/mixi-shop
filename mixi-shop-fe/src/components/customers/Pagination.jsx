const Pagination = ({ totalPages, currentPage, onPageChange }) => (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 rounded-xl border ${
            currentPage === index + 1
              ? "bg-purple-600 text-white"
              : "bg-white hover:bg-purple-100"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
  
  export default Pagination;
  