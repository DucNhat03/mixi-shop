# 🛒 Mixi Shop - Hệ thống Quản Lý Bán Hàng (Microservices Architecture)

## 📌 Mục tiêu

Xây dựng hệ thống quản lý bán hàng theo kiến trúc **Microservices**, bao gồm các service độc lập:

- **Product Service**: Quản lý sản phẩm (tên, mô tả, giá, tồn kho).
- **Order Service**: Quản lý đơn hàng (tạo, xem, hủy, sửa đơn hàng).
- **Customer Service**: Quản lý thông tin khách hàng (tên, địa chỉ, liên hệ).
- **API Gateway**: Cổng giao tiếp duy nhất định tuyến đến các service con.

---

## 🏗️ Công nghệ sử dụng

- **Node.js**, **Express.js** cho backend service.
- **MongoDB** làm cơ sở dữ liệu (mỗi service có DB riêng).
- **Docker & Docker Compose** để container hóa hệ thống.
- **RESTful API** cho giao tiếp giữa các service.
- **dotenv** cho cấu hình biến môi trường.

---

## 📁 Cấu trúc thư mục
mixi-shop-be/
├── api-gateway/
│   ├── Dockerfile
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── index.js
│       └── routes/
│           └── gateway.routes.js
│
├── product-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── index.js
│       ├── models/
│       │   └── product.model.js
│       ├── controllers/
│       │   └── productController.js
│       └── routes/
│           └── product.routes.js
│
├── order-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── index.js
│       ├── models/
│       │   └── order.model.js
│       ├── controllers/
│       │   └── orderController.js
│       └── routes/
│           └── order.routes.js
│
├── customer-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── index.js
│       ├── models/
│       │   └── customer.model.js
│       ├── controllers/
│       │   └── customerController.js
│       └── routes/
│           └── customer.routes.js
│
├── docker-compose.yml
└── README.md
