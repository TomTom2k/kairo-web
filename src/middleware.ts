import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from './constants/routes';

const intlMiddleware = createMiddleware(routing);

// Routes that don't require authentication
const publicRoutes = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER, '/test'];

export default function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Extract locale and path without locale
	const pathnameHasLocale = routing.locales.some(
		(locale) =>
			pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	);

	let locale = '';
	let pathWithoutLocale = pathname;

	if (pathnameHasLocale) {
		const segments = pathname.split('/');
		locale = segments[1];
		pathWithoutLocale = '/' + segments.slice(2).join('/');
	}

	// Normalize path (remove trailing slash)
	const normalizedPath =
		pathWithoutLocale === '/' ? '/' : pathWithoutLocale.replace(/\/$/, '');

	// Check if user has access token
	const accessToken = request.cookies.get('access_token')?.value;
	const hasToken = !!accessToken;

	// Check if current path is public or protected
	const isPublicRoute = publicRoutes.includes(normalizedPath);

	// If user has token and tries to access public routes (login/register), redirect to dashboard
	if (
		hasToken &&
		(normalizedPath === ROUTES.LOGIN || normalizedPath === ROUTES.REGISTER)
	) {
		const redirectUrl = new URL(
			`/${locale}${ROUTES.DASHBOARD}`,
			request.url
		);
		return NextResponse.redirect(redirectUrl);
	}

	// If user doesn't have token and tries to access protected routes, redirect to login
	if (!hasToken && !isPublicRoute) {
		const redirectUrl = new URL(`/${locale}${ROUTES.LOGIN}`, request.url);
		return NextResponse.redirect(redirectUrl);
	}

	// Continue with internationalization middleware
	return intlMiddleware(request);
}

export const config = {
	// Match only internationalized pathnames
	matcher: ['/', '/(vi|en)/:path*'],
};
