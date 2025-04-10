# 🛒 Mixi Shop - Hệ thống Quản Lý Bán Hàng (Microservices Architecture)

## 📌 Mục tiêu

Phát triển hệ thống quản lý bán hàng theo kiến trúc **Microservices**, với mục tiêu:

- Tách biệt logic nghiệp vụ giữa các domain: Sản phẩm, Đơn hàng, Khách hàng.
- Dễ dàng mở rộng, bảo trì, triển khai độc lập từng service.
- Đảm bảo hiệu suất cao và khả năng mở rộng linh hoạt.

---

## 🏗️ Kiến trúc hệ thống (bao gồm các service):
![mixi-shop-microservice](https://github.com/user-attachments/assets/75b8b0a6-f393-4ce6-a224-90dc2155a4d5)

- **API Gateway**: Là cầu nối duy nhất giữa client và các microservice. Nó xử lý định tuyến, gom dữ liệu từ nhiều service, kiểm tra xác thực...
- **Frontend**: Dự kiến xây dựng bằng **React + Vite** để đảm bảo hiệu suất phát triển nhanh, hiện đại.

---

## 🧰 Công nghệ sử dụng

- **Node.js** + **Express.js**: Xây dựng các backend service.
- **MongoDB**: Cơ sở dữ liệu NoSQL, mỗi service có 1 DB riêng biệt.
- **Docker & Docker Compose**: Triển khai, container hóa các service.
- **RESTful API**: Chuẩn giao tiếp giữa các service.
- **dotenv**: Cấu hình biến môi trường.
- **React + Vite** _(frontend - đang triển khai)_

---

## 📁 Cấu trúc thư mục

```
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
```

---

## 🚀 Cách chạy hệ thống

### 1. Build & khởi động với Docker

```bash
docker-compose up --build
```

Sau khi hoàn tất:
- API Gateway: http://localhost:5000
- Product Service: http://localhost:5001
- Order Service: http://localhost:5002
- Customer Service: http://localhost:5003
- MongoDB: chạy trên cổng 27017

> 💡 Yêu cầu: Cài sẵn **Docker Desktop** và **Node.js** (nếu không dùng Docker)

---

## 🎯 Định hướng phát triển

- ✅ Tạo cấu trúc project và logic CRUD cơ bản.
- ✅ API Gateway định tuyến đến từng service.
- ✅ MongoDB hoạt động ổn định trong container riêng biệt.
- ⏳ Tích hợp frontend **React Vite**.
- ⏳ Xác thực người dùng với JWT.
- ⏳ Tích hợp Kafka hoặc RabbitMQ để truyền thông tin giữa các service (event-driven).
- ⏳ CI/CD với GitHub Actions.

---

## 🧑‍💻 Tác giả

- **Sinh viên thực hiện**: Nguyen Duc Nhat
- **Thời gian thực hiện**: Tháng 09/04/2025

---

📬 *Mọi góp ý hoặc hợp tác xin gửi về: [ducnhat0910@gmail.com]*  
⭐ Nếu bạn thấy dự án hữu ích, hãy ⭐ repo này nhé!
