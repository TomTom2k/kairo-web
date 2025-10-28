'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnvelopeIcon, LockIcon, UserIcon } from '@/assets/icons';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useAuthService } from '../hooks/useAuthService';
import { registerSchema, RegisterFormData } from '@/schemas/auth.schema';
import Image from 'next/image';
import logoKairon from '@/assets/images/logo-no-bg.png';
import { setCookie, COOKIE_NAMES } from '@/lib/cookies';
import { ROUTES } from '@/constants/routes';

export default function RegisterPage() {
	const t = useTranslations('auth');
	const tCommon = useTranslations('common');
	const { registerService } = useAuthService();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: 'Demo Kairo',
			email: 'demo@kairo.com',
			password: 'Demo@123',
			confirmPassword: 'Demo@123',
		},
	});

	const onSubmit = async (data: RegisterFormData) => {
		try {
			setIsLoading(true);
			const response = await registerService(data);
			console.log('Register successful:', response);

			// Lưu token vào cookie
			if (response.data?.access_token) {
				setCookie(
					COOKIE_NAMES.ACCESS_TOKEN,
					response.data.access_token
				);
			}

			// Redirect đến dashboard
			router.push(ROUTES.DASHBOARD);
		} catch (error) {
			console.error('Registration failed:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<motion.div
			className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto relative'
			initial={{ opacity: 0, y: 50, scale: 0.9 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}>
			{/* Language Switcher */}
			<div className='absolute top-4 right-4'>
				<LanguageSwitcher />
			</div>

			{/* Logo */}
			<motion.div
				className='flex justify-center'
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}>
				<Image src={logoKairon} alt='logo' width={160} height={160} />
			</motion.div>

			{/* Title */}
			<motion.h1
				className='text-3xl font-bold text-center text-gray-900 mb-8'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.5 }}>
				{t('registerTitle')}
			</motion.h1>

			{/* Form */}
			<motion.form
				className='space-y-6'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.5 }}
				onSubmit={handleSubmit(onSubmit)}>
				{/* Username field */}
				<motion.div
					className='relative'
					initial={{ x: -50, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.5 }}>
					<motion.div
						className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'
						whileHover={{ scale: 1.1 }}>
						<UserIcon className='h-5 w-5 text-gray-400' />
					</motion.div>
					<motion.input
						type='text'
						placeholder={tCommon('username')}
						className={`text-gray-700 w-full pl-10 pr-4 py-3 border-0 border-b-2 focus:outline-none auth-input ${
							errors.name
								? 'border-red-500'
								: 'border-gray-200 focus:border-blue-500'
						}`}
						whileFocus={{ scale: 1.02 }}
						transition={{ duration: 0.2 }}
						{...register('name')}
					/>
					{errors.name && (
						<motion.p
							className='text-red-500 text-sm mt-1'
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2 }}>
							{errors.name.message}
						</motion.p>
					)}
				</motion.div>

				{/* Email field */}
				<motion.div
					className='relative'
					initial={{ x: -50, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 0.6, duration: 0.5 }}>
					<motion.div
						className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'
						whileHover={{ scale: 1.1 }}>
						<EnvelopeIcon className='h-5 w-5 text-gray-400' />
					</motion.div>
					<motion.input
						type='email'
						placeholder={tCommon('email')}
						className={`text-gray-700 w-full pl-10 pr-4 py-3 border-0 border-b-2 focus:outline-none auth-input ${
							errors.email
								? 'border-red-500'
								: 'border-gray-200 focus:border-blue-500'
						}`}
						whileFocus={{ scale: 1.02 }}
						transition={{ duration: 0.2 }}
						{...register('email')}
					/>
					{errors.email && (
						<motion.p
							className='text-red-500 text-sm mt-1'
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2 }}>
							{errors.email.message}
						</motion.p>
					)}
				</motion.div>

				{/* Password field */}
				<motion.div
					className='relative'
					initial={{ x: -50, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 0.7, duration: 0.5 }}>
					<motion.div
						className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'
						whileHover={{ scale: 1.1 }}>
						<LockIcon className='h-5 w-5 text-gray-400' />
					</motion.div>
					<motion.input
						type='password'
						placeholder={tCommon('password')}
						className={`text-gray-700 w-full pl-10 pr-4 py-3 border-0 border-b-2 focus:outline-none auth-input ${
							errors.password
								? 'border-red-500'
								: 'border-gray-200 focus:border-blue-500'
						}`}
						whileFocus={{ scale: 1.02 }}
						transition={{ duration: 0.2 }}
						{...register('password')}
					/>
					{errors.password && (
						<motion.p
							className='text-red-500 text-sm mt-1'
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2 }}>
							{errors.password.message}
						</motion.p>
					)}
				</motion.div>

				{/* Confirm Password field */}
				<motion.div
					className='relative'
					initial={{ x: -50, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ delay: 0.8, duration: 0.5 }}>
					<motion.div
						className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'
						whileHover={{ scale: 1.1 }}>
						<LockIcon className='h-5 w-5 text-gray-400' />
					</motion.div>
					<motion.input
						type='password'
						placeholder={tCommon('confirmPassword')}
						className={`text-gray-700 w-full pl-10 pr-4 py-3 border-0 border-b-2 focus:outline-none auth-input ${
							errors.confirmPassword
								? 'border-red-500'
								: 'border-gray-200 focus:border-blue-500'
						}`}
						whileFocus={{ scale: 1.02 }}
						transition={{ duration: 0.2 }}
						{...register('confirmPassword')}
					/>
					{errors.confirmPassword && (
						<motion.p
							className='text-red-500 text-sm mt-1'
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2 }}>
							{errors.confirmPassword.message}
						</motion.p>
					)}
				</motion.div>

				{/* Register button */}
				<motion.button
					type='submit'
					disabled={isLoading}
					className={`w-full text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 ${
						isLoading
							? 'bg-gray-400 cursor-not-allowed'
							: 'bg-primary hover:bg-blue-600'
					}`}
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.9, duration: 0.5 }}
					whileHover={!isLoading ? { scale: 1.05, y: -2 } : {}}
					whileTap={!isLoading ? { scale: 0.95 } : {}}>
					{isLoading ? 'Đang đăng ký...' : tCommon('register')}
				</motion.button>
			</motion.form>

			{/* Sign in link */}
			<motion.div
				className='text-center mt-6'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.0, duration: 0.5 }}>
				<span className='text-gray-600'>{t('hasAccount')} </span>
				<Link
					href='/login'
					className='text-blue-500 hover:text-blue-600 font-medium'>
					{t('loginHere')}
				</Link>
			</motion.div>
		</motion.div>
	);
}
