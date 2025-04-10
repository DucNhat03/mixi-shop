import { User2, Pencil } from "lucide-react";

const CustomerCard = ({ customer, onEdit }) => {
  return (
    <div className="border rounded-2xl p-5 shadow-md bg-white hover:shadow-lg transition">
      <div className="flex items-center gap-2 mb-2 text-purple-600">
        <User2 className="w-5 h-5" />
        <h3 className="text-lg font-semibold">{customer.name}</h3>
      </div>
      <p className="text-gray-700">📧 {customer.email}</p>
      <p className="text-gray-700">📞 {customer.phone}</p>
      <p className="text-gray-700">🏠 {customer.address}</p>
      <button
        onClick={() => onEdit(customer)}
        className="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
      >
        <Pencil className="w-4 h-4" />
        Chỉnh sửa
      </button>
    </div>
  );
};

export default CustomerCard;
