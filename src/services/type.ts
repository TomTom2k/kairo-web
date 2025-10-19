export interface IApi<Req, Res> {
	request: Req;
	response: Res;
}

export interface IPagination<T> {
	meta: {
		total: number;
		totalPages: number;
		currentPage: number;
		perPage: number;
	};
	data: T[];
}

// ====== API Response Types ======
export interface ApiSuccessResponse<T = any> {
	statusCode: number;
	message: string;
	data: T;
}

export interface ApiErrorResponse {
	statusCode: number;
	message: string;
	errorCode?: number;
}
