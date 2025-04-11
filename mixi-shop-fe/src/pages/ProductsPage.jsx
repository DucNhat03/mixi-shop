import { useEffect, useState } from "react";
import productService from "../services/productService";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import ProductCard from "../components/products/ProductCard";
import ProductFormModal from "../components/products/ProductFormModal";
import Pagination from "../components/products/Pagination";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(""); 

  const fetchProducts = async () => {
    try {
      const res = await productService.getProducts();
      setProducts(res.data);
    } catch {
      toast.error("Không thể lấy danh sách sản phẩm.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product = null) => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      });
      setEditingId(product._id);
      setIsEditing(true);
    } else {
      setForm({ name: "", description: "", price: "", stock: "" });
      setIsEditing(false);
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({ name: "", description: "", price: "", stock: "" });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      };
      if (isEditing && editingId) {
        await productService.updateProduct(editingId, data);
        toast.success("Đã cập nhật sản phẩm.");
      } else {
        await productService.createProduct(data);
        toast.success("Đã thêm sản phẩm mới.");
      }
      closeModal();
      fetchProducts();
      setCurrentPage(1);
    } catch {
      toast.error("Lỗi khi lưu sản phẩm.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await productService.deleteProduct(id);
        toast.success("🗑️ Đã xóa sản phẩm.");
        fetchProducts();
        setCurrentPage(1);
      } catch {
        toast.error("Lỗi khi xóa sản phẩm.");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Lọc theo từ khóa
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "stock-asc":
        return a.stock - b.stock;
      case "stock-desc":
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">🛍️ Danh sách sản phẩm</h2>
          <p className="text-sm text-gray-500">
            Đang hiển thị {paginatedProducts.length}/{filteredProducts.length} sản phẩm
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            placeholder="🔍 Tìm sản phẩm..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded px-3 py-2"
          />
          <select value={sortOption} onChange={handleSortChange} className="border rounded px-3 py-2">
          <option value="">🔀 Sắp xếp </option>
          <option value="price-asc">⬆️ Giá tăng dần</option>
          <option value="price-desc">⬇️ Giá giảm dần</option>
          <option value="stock-asc">⬆️ Kho tăng dần</option>
          <option value="stock-desc">⬇️ Kho giảm dần</option>
          
          </select>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <PlusCircle className="w-5 h-5" />
            Thêm sản phẩm
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} onEdit={openModal} onDelete={handleDelete} />
            ))}
          </div>
          <Pagination
            totalItems={sortedProducts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <ProductFormModal
        isOpen={isModalOpen}
        isEditing={isEditing}
        form={form}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
    </div>
  );
};

export default ProductsPage;
