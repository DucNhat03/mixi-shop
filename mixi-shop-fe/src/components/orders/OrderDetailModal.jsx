import { X } from "lucide-react";

const OrderDetailModal = ({ order, customerName, productNames, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full relative">
      <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={onClose}>
        <X className="w-5 h-5" />
      </button>
      <h3 className="text-xl font-bold mb-4">Chi tiết đơn hàng #{order._id.slice(-6)}</h3>
      <p><strong>Khách hàng:</strong> {customerName}</p>
      <p className="mt-2 font-semibold">📦 Sản phẩm:</p>
      <ul className="list-disc ml-6 text-sm">
        {order.products.map((p, idx) => (
          <li key={idx}>
            {productNames[p.productId]} (x{p.quantity})
          </li>
        ))}
      </ul>
      <p className="mt-3"><strong>Tổng tiền:</strong> {order.totalPrice.toLocaleString()}đ</p>
      <p><strong>Trạng thái:</strong> {order.status}</p>
    </div>
  </div>
);

export default OrderDetailModal;
