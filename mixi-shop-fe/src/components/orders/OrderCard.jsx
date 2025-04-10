import { Package, User, Truck, BadgeDollarSign } from "lucide-react";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "text-yellow-500";
    case "shipped":
      return "text-blue-500";
    case "delivered":
      return "text-green-600";
    default:
      return "text-gray-500";
  }
};

const OrderCard = ({ order, customerName, productNames, onDetail, onEdit }) => (
  <div className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 shadow-md rounded-2xl p-5 relative">
    <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
      <Package className="text-blue-500 w-5 h-5" />
      Đơn hàng #{order._id.slice(-6)}
    </h2>
    <p className="flex items-center gap-2 text-gray-700 mb-1">
      <User className="w-4 h-4 text-purple-600" />
      Khách hàng: <span className="font-medium ml-1">{customerName}</span>
    </p>
    <div className="mt-3 text-sm">
      <p className="font-semibold mb-1">📦 Sản phẩm:</p>
      <ul className="list-disc list-inside space-y-1 text-gray-800">
        {order.products.map((item, index) => (
          <li key={index}>
            {productNames[item.productId] || "Không xác định"} (x{item.quantity})
          </li>
        ))}
      </ul>
    </div>
    <p className="mt-3 flex items-center text-green-700 font-semibold">
      <BadgeDollarSign className="w-4 h-4 mr-1" />
      {order.totalPrice.toLocaleString()}đ
    </p>
    <p className="mt-1 flex items-center text-gray-700">
      <Truck className="w-4 h-4 mr-1 text-orange-500" />
      Trạng thái:{" "}
      <span className={`capitalize ml-1 font-medium ${getStatusColor(order.status)}`}>
        {order.status}
      </span>
    </p>

    {/* Fixed button container */}
    <div className="absolute bottom-4 left-4 right-4 flex justify-between gap-2">
      <button
        className="px-3 "
        onClick={() => onDetail(order)}
      >
        
      </button>
      <button
        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-xl"
        onClick={() => onEdit(order)}
      >
        ✏️ Chỉnh sửa
      </button>
    </div>
  </div>
);

export default OrderCard;
