import { IApi, ApiSuccessResponse } from '../type';

// ====== Api ======
export type LoginApiType = IApi<
	LoginRequestType,
	ApiSuccessResponse<LoginResponseType>
>;
export type RegisterApiType = IApi<
	RegisterRequestType,
	ApiSuccessResponse<RegisterResponseType>
>;

// ====== Request ======
export interface LoginRequestType {
	email: string;
	password: string;
}

export interface RegisterRequestType {
	name: string;
	email: string;
	password: string;
	phone?: string;
	image?: string;
}

// ====== Response ======
export interface LoginResponseType {
	access_token: string;
}

export interface RegisterResponseType {
	access_token: string;
	user: {
		_id: string;
		name: string;
		email: string;
		phone?: string;
		image?: string;
	};
}
