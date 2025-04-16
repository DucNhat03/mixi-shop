# 🛒 Mixi Shop - Hệ thống Quản Lý Bán Hàng (Microservices Architecture)

## 📌 Mục tiêu

Phát triển hệ thống quản lý bán hàng theo kiến trúc **Microservices**, với mục tiêu:

- Tách biệt logic nghiệp vụ giữa các domain: Sản phẩm, Đơn hàng, Khách hàng.
- Dễ dàng mở rộng, bảo trì, triển khai độc lập từng service.
- Đảm bảo hiệu suất cao và khả năng mở rộng linh hoạt.

## 🏗️ Kiến trúc hệ thống

![mixi-shop-microservice](https://github.com/user-attachments/assets/75b8b0a6-f393-4ce6-a224-90dc2155a4d5)

### Các thành phần chính
- **API Gateway**: Là cầu nối duy nhất giữa client và các microservice. Nó xử lý định tuyến, gom dữ liệu từ nhiều service, kiểm tra xác thực...
- **Frontend**: Dự kiến xây dựng bằng **React + Vite** để đảm bảo hiệu suất phát triển nhanh, hiện đại.

## 🧰 Công nghệ sử dụng

- **Node.js** + **Express.js**: Xây dựng các backend service.
- **MongoDB**: Cơ sở dữ liệu NoSQL, mỗi service có 1 DB riêng biệt.
- **Docker & Docker Compose**: Triển khai, container hóa các service.
- **RESTful API**: Chuẩn giao tiếp giữa các service.
- **dotenv**: Cấu hình biến môi trường.
- **React + Vite** _(frontend - đang triển khai)_

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

## 🛡️ Resilience Patterns

### 1. Circuit Breaker Pattern

#### Mục đích
- Ngăn chặn lỗi lan truyền trong hệ thống microservices
- Xử lý gracefully khi service bị lỗi hoặc quá tải
- Cho phép service phục hồi mà không bị quá tải bởi requests

#### Triển khai
```javascript
const circuitBreaker = new CircuitBreaker(async (req) => {
  const response = await axios.get(serviceUrl);
  return response.data;
}, {
  timeout: 3000,                    // Thời gian timeout cho mỗi request
  errorThresholdPercentage: 50,     // % lỗi để kích hoạt circuit breaker
  resetTimeout: 30000,              // Thời gian chờ trước khi thử lại
  volumeThreshold: 10,              // Số lượng requests tối thiểu trước khi đánh giá
});
```

#### Trạng thái
1. **CLOSED** (Bình thường)
   - Requests được chuyển tiếp bình thường
   - Theo dõi tỷ lệ lỗi và thời gian phản hồi
   - Chuyển sang OPEN nếu vượt ngưỡng lỗi

2. **OPEN** (Ngắt)
   - Từ chối requests ngay lập tức
   - Trả về fallback response hoặc thông báo lỗi
   - Chuyển sang HALF-OPEN sau resetTimeout

3. **HALF-OPEN** (Thử nghiệm)
   - Cho phép một số requests thử nghiệm
   - Đánh giá kết quả để quyết định chuyển về CLOSED hay OPEN
   - Giới hạn số lượng requests thử nghiệm

### 2. Retry Pattern

#### Mục đích
- Xử lý lỗi tạm thời trong network hoặc service
- Tăng khả năng thành công của request
- Tránh ảnh hưởng đến trải nghiệm người dùng

#### Triển khai
```javascript
const retry = new Retry(async (req) => {
  const response = await axios.get(serviceUrl);
  return response.data;
}, {
  retries: 3,                      // Số lần thử lại tối đa
  minTimeout: 1000,                // Thời gian chờ tối thiểu giữa các lần thử
  maxTimeout: 5000,                // Thời gian chờ tối đa
  factor: 2,                       // Hệ số tăng thời gian chờ (exponential backoff)
  randomize: true,                 // Thêm độ nhiễu ngẫu nhiên
});
```

#### Chiến lược Retry
1. **Immediate Retry**
   - Thử lại ngay lập tức
   - Phù hợp với lỗi tạm thời ngắn

2. **Fixed Delay**
   - Chờ một khoảng thời gian cố định giữa các lần thử
   - Tránh quá tải service

3. **Exponential Backoff**
   - Tăng thời gian chờ theo cấp số nhân
   - Giảm tải cho service khi có vấn đề

4. **Exponential Backoff with Jitter**
   - Thêm độ nhiễu ngẫu nhiên
   - Tránh "thundering herd" khi nhiều clients retry cùng lúc

### 3. Rate Limiter Pattern

#### Mục đích
- Bảo vệ service khỏi quá tải
- Đảm bảo công bằng giữa các clients
- Ngăn chặn DOS attacks

#### Triển khai
```javascript
const rateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000,        // Cửa sổ thời gian (15 phút)
  max: 100,                        // Số requests tối đa trong cửa sổ
  message: 'Quá nhiều requests, vui lòng thử lại sau.',
  standardHeaders: true,           // Trả về RateLimit headers
  legacyHeaders: false,           // Disable X-RateLimit headers
});
```

#### Thuật toán
1. **Fixed Window**
   - Giới hạn số requests trong khoảng thời gian cố định
   - Reset counter khi hết window
   - Đơn giản, dễ implement

2. **Sliding Window**
   - Cửa sổ thời gian di chuyển
   - Chính xác hơn Fixed Window
   - Tránh spike tại ranh giới window

3. **Token Bucket**
   - Thêm tokens theo tốc độ cố định
   - Mỗi request tiêu thụ một token
   - Cho phép burst traffic trong giới hạn

4. **Leaky Bucket**
   - Xử lý requests với tốc độ cố định
   - Queue requests vượt quá giới hạn
   - Đảm bảo tải đều cho backend

### 4. Time Limiter Pattern

#### Mục đích
- Ngăn chặn requests chậm chiếm tài nguyên
- Đảm bảo responsive cho hệ thống
- Tránh deadlock và resource leaks

#### Triển khai
```javascript
const timeLimiter = new TimeLimiter({
  timeout: 5000,                   // Thời gian timeout (ms)
  onTimeout: async (req) => {
    // Xử lý khi request timeout
    return { error: 'Request timeout' };
  },
  shouldTimeout: (req) => {
    // Logic quyết định có áp dụng timeout
    return true;
  }
});
```

#### Chiến lược Timeout
1. **Fixed Timeout**
   - Thời gian cố định cho mọi request
   - Đơn giản, dễ quản lý

2. **Dynamic Timeout**
   - Điều chỉnh timeout dựa trên loại request
   - Phù hợp với các operation phức tạp

3. **Adaptive Timeout**
   - Tự động điều chỉnh dựa trên điều kiện hệ thống
   - Tối ưu hóa performance

#### Xử lý Timeout
1. **Cancel Operation**
   - Hủy request khi timeout
   - Giải phóng tài nguyên

2. **Partial Response**
   - Trả về kết quả một phần nếu có
   - Thông báo cho client về tình trạng timeout

3. **Fallback Strategy**
   - Cung cấp dữ liệu cached hoặc default
   - Đảm bảo UX khi có timeout

## 🎯 Frontend Integration

### Error Handling Components
1. **ErrorBoundary**
   ```jsx
   <ErrorBoundary fallback={<ErrorFallback />}>
     <App />
   </ErrorBoundary>
   ```

2. **LoadingSpinner**
   ```jsx
   {isLoading && (
     <div className="loading-spinner">
       <div className="spinner"></div>
       <span>Đang tải...</span>
     </div>
   )}
   ```

3. **ErrorFallback**
   ```jsx
   const ErrorFallback = ({ error, resetError }) => (
     <div className="error-container">
       <ServerIcon className="error-icon" />
       <h3>{error.title}</h3>
       <p>{error.message}</p>
       <button onClick={resetError}>Thử lại</button>
     </div>
   );
   ```

### Toast Notifications
```jsx
// Success
toast.success("Thao tác thành công!");

// Error với chi tiết
toast.error("Lỗi", {
  description: error.message,
  action: {
    label: "Thử lại",
    onClick: () => retry()
  }
});
```

## 📚 API Documentation

### Products API
- `GET /api/products` - Lấy danh sách sản phẩm
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm

### Orders API
- `GET /api/orders` - Lấy danh sách đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id` - Cập nhật đơn hàng
- `DELETE /api/orders/:id` - Xóa đơn hàng

### Customers API
- `GET /api/customers` - Lấy danh sách khách hàng
- `POST /api/customers` - Tạo khách hàng mới
- `PUT /api/customers/:id` - Cập nhật khách hàng
- `DELETE /api/customers/:id` - Xóa khách hàng

## 🔄 Monitoring và Logging

### Frontend Monitoring
- Error tracking và reporting
- Performance metrics
- User behavior analytics

### Backend Monitoring
- Service health checks
- Resource utilization
- Error rates và latency

### Logging Strategy
- Request/Response logs
- Error stacks
- Performance metrics
- Circuit breaker state changes

## 🚀 Hướng dẫn cài đặt và chạy

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

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run start
```

## 🎯 Định hướng phát triển

- ✅ Tạo cấu trúc project và logic CRUD cơ bản.
- ✅ API Gateway định tuyến đến từng service.
- ✅ MongoDB hoạt động ổn định trong container riêng biệt.
- ⏳ Tích hợp frontend **React Vite**.
- ⏳ Xác thực người dùng với JWT.
- ⏳ Tích hợp Kafka hoặc RabbitMQ để truyền thông tin giữa các service (event-driven).
- ⏳ CI/CD với GitHub Actions.

## 👥 Thông tin

- **Sinh viên thực hiện**: Nguyen Duc Nhat
- **Email**: ducnhat0910@gmail.com
- **Thời gian thực hiện**: Tháng 09/04/2025

## 📄 License

MIT License - Copyright (c) 2024 Nguyen Duc Nhat

---

📬 *Mọi góp ý hoặc hợp tác xin gửi về: [ducnhat0910@gmail.com]*  
⭐ Nếu bạn thấy dự án hữu ích, hãy ⭐ repo này nhé!
