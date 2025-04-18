import { AlertCircle, RefreshCw, Server, Clock, Ban } from 'lucide-react';

const ErrorFallback = ({ error, resetError }) => {
  // Xác định loại lỗi và hiển thị thông báo phù hợp
  const getErrorContent = () => {
    // Circuit Breaker Error
    if (error?.message?.includes('Service Unavailable')) {
      return {
        icon: <Server className="w-12 h-12 text-yellow-500" />,
        title: 'Service Tạm Thời Không Khả Dụng',
        message: 'Hệ thống đang tạm thời quá tải. Vui lòng thử lại sau vài giây.',
        buttonText: 'Thử Lại'
      };
    }

    // Rate Limiter Error
    if (error?.message?.includes('Too Many Requests')) {
      return {
        icon: <Ban className="w-12 h-12 text-red-500" />,
        title: 'Quá Nhiều Yêu Cầu',
        message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau vài phút.',
        buttonText: 'Đã Hiểu'
      };
    }

    // Timeout Error
    if (error?.message?.includes('timeout') || error?.code === 'ECONNABORTED') {
      return {
        icon: <Clock className="w-12 h-12 text-orange-500" />,
        title: 'Yêu Cầu Hết Thời Gian',
        message: 'Máy chủ mất quá nhiều thời gian để phản hồi. Vui lòng thử lại.',
        buttonText: 'Thử Lại'
      };
    }

    // Default Error
    return {
      icon: <AlertCircle className="w-12 h-12 text-red-500" />,
      title: 'Đã Có Lỗi Xảy Ra',
      message: error?.message || 'Không thể tải dữ liệu. Vui lòng thử lại sau.',
      buttonText: 'Tải Lại'
    };
  };

  const { icon, title, message, buttonText } = getErrorContent();

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
      {icon}
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 text-center max-w-md">{message}</p>
      <button
        onClick={resetError}
        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        {buttonText}
      </button>
    </div>
  );
};

export default ErrorFallback; 