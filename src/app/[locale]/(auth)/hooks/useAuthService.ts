'use client';

import { authApi, LoginApiType, RegisterApiType } from '@/services/auth';

export const useAuthService = () => {
	const loginService = async (payload: LoginApiType['request']) => {
		const response = await authApi.login(payload);
		return response;
	};

	const registerService = async (payload: RegisterApiType['request']) => {
		const response = await authApi.register(payload);
		return response;
	};

	return {
		loginService,
		registerService,
	};
};
