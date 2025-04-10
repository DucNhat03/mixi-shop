import { useEffect, useState } from "react";
import customerService from "../services/customerService";
import CustomerList from "../components/customers/CustomerList";
import Pagination from "../components/customers/Pagination";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(""); // name-asc, name-desc, email-asc, email-desc

  const customersPerPage = 6;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    customerService
      .getCustomers()
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Error fetching customers:", err));
  };

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

  // Lọc theo tên hoặc email
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "email-asc":
        return a.email.localeCompare(b.email);
      case "email-desc":
        return b.email.localeCompare(a.email);
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
            <option value="name-asc">Tên A-Z</option>
            <option value="name-desc">Tên Z-A</option>
            <option value="email-asc">Email A-Z</option>
            <option value="email-desc">Email Z-A</option>
          </select>
        </div>
      </div>

      {currentCustomers.length === 0 ? (
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
