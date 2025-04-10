import { useState, useEffect } from "react";
import { X, Package, User, DollarSign, RefreshCcw, Edit } from "lucide-react";

const OrderDetailModal = ({ order, customerName, productNames, onClose, onSave }) => {
  const [editableOrder, setEditableOrder] = useState(order);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditableOrder(order);
  }, [order]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleStatusChange = (e) => {
    setEditableOrder((prevOrder) => ({
      ...prevOrder,
      status: e.target.value,
    }));
  };

  const handlePriceChange = (e) => {
    setEditableOrder((prevOrder) => ({
      ...prevOrder,
      totalPrice: parseInt(e.target.value.replace(/\D/g, "")) || 0, 
    }));
  };

  const handleSave = () => {
    onSave(editableOrder); 
    setIsEditing(false); 
    onClose(); 
  };

  const handleEdit = () => {
    setIsEditing(true); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fadeIn">
        <div className="flex justify-between items-center mb-5 border-b pb-3">
          <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            🧾 Đơn hàng #{order._id.slice(-6)}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-2 text-gray-700">
            <User className="w-5 h-5 mt-1" />
            <p><strong>Khách hàng:</strong> {customerName}</p>
          </div>

  
          <div className="text-gray-700">
            <div className="flex items-center gap-2 font-semibold mb-1">
              <Package className="w-5 h-5" />
              <span>Sản phẩm:</span>
            </div>
            <ul className="ml-7 list-disc text-sm space-y-1">
              {order.products.map((p, idx) => (
                <li key={idx}>
                  {productNames[p.productId]} <span className="text-gray-500">(x{p.quantity})</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <DollarSign className="w-5 h-5" />
            <p>
              <strong>Tổng tiền:</strong>{" "}
              {isEditing ? (
                <input
                  type="text"
                  value={editableOrder.totalPrice.toLocaleString()}
                  onChange={handlePriceChange}
                  className="text-green-600 font-bold text-base bg-gray-100 p-1 rounded-md"
                />
              ) : (
                <span className="text-green-600 font-bold text-base">
                  {editableOrder.totalPrice.toLocaleString()} VNĐ
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <RefreshCcw className="w-5 h-5" />
            <p>
              <strong>Trạng thái:</strong>{" "}
              {isEditing ? (
                <select
                  value={editableOrder.status}
                  onChange={handleStatusChange}
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                    editableOrder.status
                  )}`}
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              ) : (
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                    editableOrder.status
                  )}`}
                >
                  {editableOrder.status}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-3">
          {isEditing ? (
            <>
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
                onClick={onClose}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                onClick={handleSave}
              >
                Lưu thay đổi
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md text-sm"
              onClick={handleEdit}
            >
              <Edit className="w-4 h-4 inline-block mr-2" />
              Chỉnh sửa
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
