import { useEffect, useState, useRef } from "react";
import customerService from "../services/customerService";
import CustomerList from "../components/customers/CustomerList";
import Pagination from "../components/customers/Pagination";
import ErrorFallback from "../components/common/ErrorFallback";
import { toast } from "sonner";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(""); // name-asc, name-desc, email-asc, email-desc

  const customersPerPage = 6;
  const isFetched = useRef(false);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await customerService.getCustomers();
      setCustomers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      let errorMessage = "Không thể lấy danh sách khách hàng.";
      
      if (error.response?.status === 429) {
        errorMessage = "Quá nhiều yêu cầu. Vui lòng thử lại sau.";
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = "Yêu cầu hết thời gian. Vui lòng thử lại.";
      } else if (error.response?.status === 503) {
        errorMessage = "Service tạm thời không khả dụng.";
      }

      setError({
        ...error,
        userMessage: errorMessage
      });
      toast.error(errorMessage);
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;
    
    fetchCustomers();
  }, []);

  const handleEditClick = (customer) => {
    setEditingCustomer(customer._id);
    setFormData(customer);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (id) => {
    try {
      await customerService.updateCustomer(id, formData);
      fetchCustomers();
      setEditingCustomer(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Lọc theo tên hoặc email (chỉ khi có customers)
  const filteredCustomers = customers?.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Sắp xếp
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedCustomers.length / customersPerPage);
  const currentCustomers = sortedCustomers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">👥 Danh sách khách hàng</h2>
          <p className="text-sm text-gray-500">
            Đang hiển thị {currentCustomers.length}/{filteredCustomers.length} khách hàng
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <input
            type="text"
            placeholder="🔍 Tìm theo tên hoặc email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border px-3 py-2 rounded"
          />
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="border px-3 py-2 rounded"
          >
            <option value="">-- Sắp xếp --</option>
            <option value="name-asc">⬆️ Tên A-Z</option>
            <option value="name-desc">⬇️ Tên Z-A</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
        </div>
      ) : error ? (
        <div className="flex justify-center py-10">
          <ErrorFallback
            error={error}
            resetError={fetchCustomers}
          />
        </div>
      ) : currentCustomers.length === 0 ? (
        <p>Không có khách hàng nào.</p>
      ) : (
        <>
          <CustomerList
            customers={currentCustomers}
            editingCustomer={editingCustomer}
            formData={formData}
            onEditClick={handleEditClick}
            onChange={handleInputChange}
            onSave={handleSave}
            onCancel={() => setEditingCustomer(null)}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default CustomersPage;
