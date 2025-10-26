import axiosInstance from '@/lib/axiosConfig';
import { LoginApiType, RegisterApiType } from './type';

type AuthApiType = {
	login: (
		payload: LoginApiType['request']
	) => Promise<LoginApiType['response']>;
	register: (
		payload: RegisterApiType['request']
	) => Promise<RegisterApiType['response']>;
};

const REGISTER_URL = '/v1/auth/register';
const LOGIN_URL = '/v1/auth/login';

export const authApi: AuthApiType = {
	login: async (payload) => {
		const response = await axiosInstance.post<LoginApiType['response']>(
			LOGIN_URL,
			payload
		);
		return response.data;
	},
	register: async (payload) => {
		const response = await axiosInstance.post<RegisterApiType['response']>(
			REGISTER_URL,
			payload
		);
		return response.data;
	},
};
