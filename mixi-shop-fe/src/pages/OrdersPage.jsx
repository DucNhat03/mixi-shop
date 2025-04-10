import { useEffect, useState } from "react";
import orderService from "../services/orderService";
import customerService from "../services/customerService";
import productService from "../services/productService";
import OrderCard from "../components/orders/OrderCard";
import OrderDetailModal from "../components/orders/OrderDetailModal";
import StatusFilter from "../components/orders/StatusFilter";
import Pagination from "../components/orders/Pagination";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [customersMap, setCustomersMap] = useState({});
  const [productsMap, setProductsMap] = useState({});
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const pageSize = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, customersRes, productsRes] = await Promise.all([
          orderService.getOrders(),
          customerService.getCustomers(),
          productService.getProducts(),
        ]);

        const customers = Object.fromEntries(customersRes.data.map((c) => [c._id, c.name]));
        const products = Object.fromEntries(productsRes.data.map((p) => [p._id, p.name]));

        setOrders(ordersRes.data);
        setCustomersMap(customers);
        setProductsMap(products);
      } catch (err) {
        console.error("Lỗi khi load đơn hàng:", err);
      }
    };

    fetchData();
  }, []);

  const filteredOrders = orders.filter((order) =>
    statusFilter ? order.status === statusFilter : true
  );

  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const currentOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📦 Danh sách đơn hàng</h1>

      <StatusFilter statusFilter={statusFilter} setStatusFilter={(status) => {
        setStatusFilter(status);
        setCurrentPage(1);
      }} />

      {currentOrders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              customerName={customersMap[order.customerId] || "Không xác định"}
              productNames={productsMap}
              onDetail={setSelectedOrder}
            />
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          customerName={customersMap[selectedOrder.customerId]}
          productNames={productsMap}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
