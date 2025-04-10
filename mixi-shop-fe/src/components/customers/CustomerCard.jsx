import { User2, Pencil } from "lucide-react";

const CustomerCard = ({ customer, onEdit }) => {
  return (
    <div className="border rounded-2xl p-6 shadow-md bg-white hover:shadow-lg transition">
      <div className="flex items-center gap-2 mb-3 text-purple-600">
        <User2 className="w-6 h-6 text-purple-500" />
        <h3 className="text-xl font-semibold">{customer.name}</h3>
      </div>
      <p className="text-gray-700 mb-2">📧 <span className="font-medium">{customer.email}</span></p>
      <p className="text-gray-700 mb-2">📞 <span className="font-medium">{customer.phone}</span></p>
      <p className="text-gray-700 mb-4">🏠 <span className="font-medium">{customer.address}</span></p>

      {/* Chỉnh sửa Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onEdit(customer)}
          className="px-2 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-xl flex items-center gap-0 transition-all duration-300 shadow-md hover:shadow-lg"
          title="Chỉnh sửa thông tin khách hàng"
        >
          <Pencil className="w-5 h-5" />
          <span className="ml-2">Chỉnh sửa</span>
        </button>
      </div>
    </div>
  );
};

export default CustomerCard;
