import { useEffect, useState, useRef } from "react";
import orderService from "../services/orderService";
import customerService from "../services/customerService";
import productService from "../services/productService";
import OrderCard from "../components/orders/OrderCard";
import OrderDetailModal from "../components/orders/OrderDetailModal";
import StatusFilter from "../components/orders/StatusFilter";
import Pagination from "../components/orders/Pagination";
import ErrorFallback from "../components/common/ErrorFallback";
import { toast } from "sonner";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [customersMap, setCustomersMap] = useState({});
  const [productsMap, setProductsMap] = useState({});
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 6;
  
  const isFetched = useRef(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Gọi và xử lý customers service
      const customersRes = await customerService.getCustomers();
      const customers = Object.fromEntries((customersRes?.data || []).map((c) => [c._id, c.name]));
      setCustomersMap(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error("Không thể tải danh sách khách hàng");
    }

    try {
      // Gọi và xử lý products service
      const productsRes = await productService.getProducts();
      const products = Object.fromEntries((productsRes?.data || []).map((p) => [p._id, p.name]));
      setProductsMap(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error("Không thể tải danh sách sản phẩm");
    }

    try {
      // Gọi và xử lý orders service
      const ordersRes = await orderService.getOrders();
      setOrders(ordersRes?.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error);
      toast.error(error.userMessage || "Không thể tải danh sách đơn hàng");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;
    
    fetchData();
  }, []);

  const filteredOrders = orders.filter((order) =>
    statusFilter ? order.status === statusFilter : true
  );

  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const currentOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSave = async (updatedOrder) => {
    try {
      await orderService.updateOrder(updatedOrder._id, updatedOrder);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
      setSelectedOrder(null);
      toast.success("Đã cập nhật đơn hàng thành công");
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error(error.userMessage || "Lỗi khi cập nhật đơn hàng");
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">📦 Danh sách đơn hàng</h2>
          <p className="text-sm text-gray-500">
            Đang hiển thị {currentOrders.length}/{filteredOrders.length} đơn hàng
          </p>
        </div>

        <StatusFilter
          statusFilter={statusFilter}
          setStatusFilter={(status) => {
            setStatusFilter(status);
            setCurrentPage(1);
          }}
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
        </div>
      ) : error ? (
        <div className="flex justify-center py-10">
          <ErrorFallback
            error={error}
            resetError={fetchData}
          />
        </div>
      ) : currentOrders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                customerName={customersMap[order.customerId] || "Không xác định"}
                productNames={productsMap}
                onDetail={setSelectedOrder}
                onEdit={(order) => setSelectedOrder(order)}
              />
            ))}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          {selectedOrder && (
            <OrderDetailModal
              order={selectedOrder}
              customerName={customersMap[selectedOrder.customerId]}
              productNames={productsMap}
              onClose={() => setSelectedOrder(null)}
              onSave={handleSave}
            />
          )}
        </>
      )}
    </div>
  );
};

export default OrdersPage;
