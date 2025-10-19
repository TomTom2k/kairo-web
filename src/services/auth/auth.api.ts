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

export const authApi: AuthApiType = {
	login: async (payload) => {
		const response = await axiosInstance.post<LoginApiType['response']>(
			'/auth/login',
			payload
		);
		return response.data;
	},
	register: async (payload) => {
		const response = await axiosInstance.post<RegisterApiType['response']>(
			'/auth/register',
			payload
		);
		return response.data;
	},
};
