'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import {
	hasToken,
	clearAuthCookies,
	getCookie,
	COOKIE_NAMES,
} from '@/lib/cookies';
import { ROUTES } from '@/constants/routes';

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		// Check authentication status on mount
		const checkAuth = () => {
			const token = getCookie(COOKIE_NAMES.ACCESS_TOKEN);
			setIsAuthenticated(!!token);
			setIsLoading(false);
		};

		checkAuth();
	}, []);

	const logout = () => {
		clearAuthCookies();
		setIsAuthenticated(false);
		router.push(ROUTES.LOGIN);
	};

	const login = (accessToken: string, refreshToken?: string) => {
		// This will be handled by the login/register pages
		setIsAuthenticated(true);
	};

	return {
		isAuthenticated,
		isLoading,
		logout,
		login,
	};
};
