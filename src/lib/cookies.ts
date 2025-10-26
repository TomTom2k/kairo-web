import Cookies from 'js-cookie';

// Cookie names constants
export const COOKIE_NAMES = {
	ACCESS_TOKEN: 'access_token',
	REFRESH_TOKEN: 'refresh_token',
} as const;

// Cookie options
const COOKIE_OPTIONS = {
	expires: 7, // 7 days
	secure: true,
	sameSite: 'strict' as const,
	path: '/',
};

// Set cookie
export const setCookie = (name: string, value: string, days?: number) => {
	const options = days
		? { ...COOKIE_OPTIONS, expires: days }
		: COOKIE_OPTIONS;
	Cookies.set(name, value, options);
};

// Get cookie
export const getCookie = (name: string): string | null => {
	return Cookies.get(name) || null;
};

// Remove cookie
export const removeCookie = (name: string) => {
	Cookies.remove(name, { path: '/' });
};

// Check if user has token
export const hasToken = (): boolean => {
	return !!getCookie(COOKIE_NAMES.ACCESS_TOKEN);
};

// Clear all auth cookies
export const clearAuthCookies = () => {
	removeCookie(COOKIE_NAMES.ACCESS_TOKEN);
	removeCookie(COOKIE_NAMES.REFRESH_TOKEN);
};
