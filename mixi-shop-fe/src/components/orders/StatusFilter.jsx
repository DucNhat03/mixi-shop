import { RefreshCcw, Truck, CheckCircle } from "lucide-react";

const StatusFilter = ({ statusFilter, setStatusFilter }) => (
  <div className="mb-6 flex items-center gap-4">
    <label className="font-medium text-gray-700">Lọc theo trạng thái:</label>
    <select
      className="border border-gray-300 text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="">🔎 Tất cả</option>
      <option value="pending">⏳ Chờ xử lý</option>
      <option value="shipped">🚚 Đã giao</option>
      <option value="delivered">✅ Hoàn thành</option>
    </select>
  </div>
);

export default StatusFilter;
