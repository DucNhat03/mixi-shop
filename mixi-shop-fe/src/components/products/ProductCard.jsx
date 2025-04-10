import { ShoppingCart, Boxes, Pencil, Trash2 } from "lucide-react";

const DEFAULT_IMAGE =
  "https://product.hstatic.net/200000881795/product/ao-phong-mixi-toc-truong-600x900_633ba899513c4312a4e613f119877914.jpg";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(product.price);

  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col">
      {/* image */}
      <img
        src={product.image || DEFAULT_IMAGE}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* info */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="mb-4 space-y-1">
          <div className="flex items-center gap-2 text-blue-600">
            <ShoppingCart className="w-5 h-5" />
            <h3 className="text-base font-bold truncate">{product.name}</h3>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
          <p className="text-green-600 font-semibold">{formattedPrice}</p>
          <div className="flex items-center gap-1 text-gray-700 text-sm">
            <Boxes className="w-4 h-4" />
            Tồn kho:{" "}
            <span
              className={`font-semibold ${
                isOutOfStock ? "text-red-500" : ""
              }`}
            >
              {product.stock}
            </span>
          </div>
          {isOutOfStock && (
            <p className="text-red-500 text-sm font-semibold">Hết hàng</p>
          )}
        </div>

        {/* button */}
        <div className="flex justify-end gap-3 mt-auto">
          <button
            onClick={() => onEdit(product)}
            className="flex items-center gap-1 text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition"
          >
            <Pencil className="w-4 h-4" />
            Sửa
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="flex items-center gap-1 text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
