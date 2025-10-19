import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

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
		this.name = 'ApiError';
		this.statusCode = statusCode;
		this.errorCode = errorCode;
		this.originalMessage = originalMessage || message;
	}
}

// Tạo axios instance
const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor - thêm token và locale vào header
axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// Lấy token từ localStorage hoặc cookie
		const token =
			typeof window !== 'undefined'
				? localStorage.getItem('access_token')
				: null;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// Lấy locale từ URL hoặc localStorage
		const locale = getLocaleFromPath() || 'vi';
		config.headers['Accept-Language'] = locale;

		return config;
	},
	(error: unknown) => {
		return Promise.reject(error);
	}
);

// Response interceptor - xử lý lỗi với error_code
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

			return Promise.reject(apiError);
		} else if (error.request) {
			// Request đã được gửi nhưng không nhận được response
			const apiError = new ApiError('Network error', 0);
			return Promise.reject(apiError);
		} else {
			// Lỗi khi setup request
			const apiError = new ApiError(error.message, 0);
			return Promise.reject(apiError);
		}
	}
);

// Helper function để lấy locale từ URL path
function getLocaleFromPath(): string | null {
	if (typeof window === 'undefined') return null;

	const pathname = window.location.pathname;
	const localeMatch = pathname.match(/^\/(en|vi)(\/|$)/);

	return localeMatch ? localeMatch[1] : null;
}

// Helper function để generate error_code từ status và error type
function generateErrorCode(status: number, errorType?: string): string {
	const errorMap: Record<number, string> = {
		400: 'BAD_REQUEST',
		401: 'UNAUTHORIZED',
		403: 'FORBIDDEN',
		404: 'NOT_FOUND',
		409: 'CONFLICT',
		422: 'VALIDATION_ERROR',
		500: 'INTERNAL_SERVER_ERROR',
		502: 'BAD_GATEWAY',
		503: 'SERVICE_UNAVAILABLE',
	};

	// Nếu có error type cụ thể, kết hợp với status
	if (errorType) {
		return `${status}_${errorType.toUpperCase().replace(/\s+/g, '_')}`;
	}

	return errorMap[status] || `HTTP_ERROR_${status}`;
}

// Helper function để get error message với translation
export function getErrorMessage(
	error: unknown,
	translations: Record<string, any>
): string {
	if (error instanceof ApiError) {
		const errorCode = error.errorCode;

		if (errorCode && translations.errors?.[errorCode]) {
			return translations.errors[errorCode];
		}

		// Fallback to status code based message
		const statusKey = `${error.statusCode}`;
		if (translations.errors?.[statusKey]) {
			return translations.errors[statusKey];
		}

		// Fallback to original message
		return Array.isArray(error.originalMessage)
			? error.originalMessage[0]
			: error.originalMessage;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return translations.errors?.UNKNOWN_ERROR || 'An unknown error occurred';
}

export default axiosInstance;
