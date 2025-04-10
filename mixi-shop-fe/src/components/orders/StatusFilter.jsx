const StatusFilter = ({ statusFilter, setStatusFilter }) => (
    <div className="mb-6 flex items-center gap-4">
      <label className="font-medium">Lọc theo trạng thái:</label>
      <select
        className="border px-3 py-1 rounded"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">Tất cả</option>
        <option value="pending">Chờ xử lý</option>
        <option value="shipped">Đã giao</option>
        <option value="delivered">Hoàn thành</option>
      </select>
    </div>
  );
  
  export default StatusFilter;
  