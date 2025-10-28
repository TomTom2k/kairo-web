import { toast } from "react-toastify";

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import { getCookie, COOKIE_NAMES } from "./cookies";
import { translateErrorMessage } from "./errorTranslations";

// Error response type từ backend
interface ApiErrorResponse {
  message: string | string[];
  error?: string;
  statusCode: number;
  errorCode?: number;
}

// Custom error class để chứa errorCode
export class ApiError extends Error {
  statusCode: number;
  errorCode?: number;
  originalMessage: string | string[];

  constructor(
    message: string,
    statusCode: number,
    errorCode?: number,
    originalMessage?: string | string[]
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.originalMessage = originalMessage || message;
  }
}

// Tạo axios instance
const axiosInstance = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - thêm token và locale vào header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Lấy token từ cookie
    const token = getCookie(COOKIE_NAMES.ACCESS_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Lấy locale từ URL hoặc localStorage
    // Lấy locale từ URL
    const locale = "vi"; // Default locale
    config.headers["Accept-Language"] = locale;

    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// Response interceptor - xử lý lỗi với error_code và tự động hiển thị toast
axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const { data, status } = error.response;

      // Tạo ApiError với errorCode từ backend
      const apiError = new ApiError(
        Array.isArray(data.message) ? data.message[0] : data.message,
        status,
        data.errorCode,
        data.message
      );

      // Tự động hiển thị toast error
      showToastError(apiError);

      return Promise.reject(apiError);
    } else if (error.request) {
      // Request đã được gửi nhưng không nhận được response
      const apiError = new ApiError("Network error", 0);

      // Hiển thị toast cho network error
      toast.error("Network error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return Promise.reject(apiError);
    } else {
      // Lỗi khi setup request
      const apiError = new ApiError(error.message, 0);

      // Hiển thị toast cho setup error
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      return Promise.reject(apiError);
    }
  }
);

// Helper function để hiển thị toast error tự động
function showToastError(error: ApiError) {
  let messageKey = "";

  // Map specific error codes
  switch (error.statusCode) {
    case 400:
      // Map 400 errors to specific messages
      if (error.errorCode) {
        // Try to get specific error message from translation
        messageKey = `errors.400.${error.errorCode}`;
      } else {
        messageKey = "errors.400.GENERAL";
      }
      break;
    case 401:
      messageKey = "errors.401";
      break;
    case 403:
      messageKey = "errors.403";
      break;
    case 404:
      messageKey = "errors.404";
      break;
    case 422:
      messageKey = "errors.422";
      break;
    case 500:
      messageKey = "errors.500";
      break;
    default:
      // For unknown errors, use original message
      const originalMessage = Array.isArray(error.originalMessage)
        ? error.originalMessage[0]
        : (error.originalMessage as string);

      // Show toast error with translation
      toast.error(originalMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
  }

  // Translate the message
  const translatedMessage = translateErrorMessage(messageKey);

  // Show toast error with translation
  toast.error(translatedMessage, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

export default axiosInstance;
