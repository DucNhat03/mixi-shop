import { ShoppingCart, Boxes, Pencil, Trash2 } from "lucide-react";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="border rounded-2xl p-5 shadow-md bg-white hover:shadow-lg transition">
      <div className="flex items-center gap-2 mb-2 text-blue-600">
        <ShoppingCart className="w-5 h-5" />
        <h3 className="text-lg font-semibold">{product.name}</h3>
      </div>
      <p className="text-gray-700 mb-1">{product.description}</p>
      <p className="text-green-600 font-semibold mb-1">
        Giá: {parseFloat(product.price).toLocaleString()} VNĐ
      </p>
      <p className="text-gray-600 flex items-center gap-1">
        <Boxes className="w-4 h-4" />
        Tồn kho: <span className="font-medium">{product.stock}</span>
      </p>
      <div className="flex gap-3 mt-4">
        <button onClick={() => onEdit(product)} className="text-blue-500 hover:underline flex items-center gap-1">
          <Pencil className="w-4 h-4" /> Sửa
        </button>
        <button onClick={() => onDelete(product._id)} className="text-red-500 hover:underline flex items-center gap-1">
          <Trash2 className="w-4 h-4" /> Xóa
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
