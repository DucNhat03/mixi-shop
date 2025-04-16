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

## 🔄 Circuit Breaker Pattern

### Mục đích
- Ngăn chặn lỗi lan truyền trong hệ thống microservices
- Xử lý gracefully khi service bị lỗi hoặc quá tải
- Cho phép service phục hồi mà không bị quá tải bởi requests

### Triển khai
- **Middleware**: Sử dụng `opossum` - thư viện Circuit Breaker cho Node.js
- **Vị trí**: Được tích hợp tại API Gateway cho mỗi route đến các service

### Cấu hình
```javascript
const circuitBreakerOptions = {
  timeout: 3000,              // Thời gian timeout cho mỗi request
  errorThresholdPercentage: 50, // % lỗi để kích hoạt circuit breaker
  resetTimeout: 30000,        // Thời gian chờ trước khi thử lại (half-open)
}
```

### Trạng thái
1. **CLOSED** (Bình thường)
   - Requests được chuyển tiếp bình thường đến service
   - Theo dõi tỷ lệ lỗi

2. **OPEN** (Ngắt)
   - Kích hoạt khi vượt ngưỡng lỗi
   - Trả về lỗi ngay lập tức
   - Hiển thị thông báo "Service tạm thời không khả dụng"

3. **HALF-OPEN** (Thử nghiệm)
   - Sau thời gian resetTimeout
   - Cho phép một số requests thử nghiệm
   - Kiểm tra service đã phục hồi chưa

### Frontend Integration
- **ErrorFallback Component**: Hiển thị UI thân thiện cho người dùng khi có lỗi
- **Trạng thái hiển thị**: 
  1. **Trạng thái bình thường**:
     - Hiển thị danh sách sản phẩm
     - Có thể thêm, sửa, xóa sản phẩm
     - Hiển thị số lượng sản phẩm (VD: "Đang hiển thị 6/15 sản phẩm")
     
  2. **Trạng thái lỗi**:
     - Icon server màu vàng khi Circuit Breaker OPEN
     - Thông báo "Service Tạm Thời Không Khả Dụng" 
     - Message "Hệ thống đang tạm thời quá tải. Vui lòng thử lại sau vài giây."
     - Nút "Thử Lại" để reset Circuit Breaker
     - Thông báo nhỏ màu đỏ ở góc phải: "Service tạm thời không khả dụng. Vui lòng thử lại sau."

### Xử lý lỗi thông minh
- **Network Error**: 
  - Hiển thị icon cảnh báo
  - Thông báo lỗi rõ ràng
  - Nút "Tải Lại" để thử kết nối lại
- **Circuit Breaker States**:
  - CLOSED: Hoạt động bình thường, hiển thị danh sách sản phẩm
  - OPEN: Hiển thị thông báo lỗi và icon server
  - HALF-OPEN: Thử kết nối lại sau thời gian reset

### Ví dụ UI States
1. **Normal State** (Circuit Breaker CLOSED):
   ```
   🛍️ Danh sách sản phẩm
   Đang hiển thị 6/15 sản phẩm
   [Danh sách các sản phẩm với hình ảnh, giá, tồn kho]
   ```
   ![Normal State](./docs/images/cb-normal-state.png)
   *Hình 1: Trạng thái bình thường - Circuit Breaker CLOSED*

2. **Error State** (Circuit Breaker OPEN):
   ```
   🔌 Service Tạm Thời Không Khả Dụng
   Hệ thống đang tạm thời quá tải. Vui lòng thử lại sau vài giây.
   [Nút Thử Lại]
   ```
   ![Error State](./docs/images/cb-error-state.png)
   *Hình 2: Trạng thái lỗi - Circuit Breaker OPEN*

### Monitoring và Logging
- **UI Feedback**: 
  - Toast notifications cho lỗi
  - Status indicators trong header
  - Error boundaries để catch lỗi
- **Backend Logs**:
  - Circuit Breaker state changes
  - Failed requests tracking
  - Service health monitoring

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
