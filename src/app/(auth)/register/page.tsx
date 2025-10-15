'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserIcon, EnvelopeIcon, LockIcon } from '@/assets/icons';

export default function RegisterPage() {
	return (
		<motion.div
			className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto'
			initial={{ opacity: 0, y: 50, scale: 0.9 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}>
			{/* Logo */}
			<motion.div
				className='flex justify-center mb-6'
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}>
				<motion.div
					className='w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center'
					whileHover={{ rotate: 360 }}
					transition={{ duration: 0.6 }}>
					<motion.div
						className='w-6 h-6 bg-white rounded-full'
						animate={{ scale: [1, 1.2, 1] }}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
				</motion.div>
			</motion.div>

			{/* Title */}
			<motion.h1
				className='text-3xl font-bold text-center text-gray-900 mb-8'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.5 }}>
				Sign Up
			</motion.h1>

			{/* Form */}
			<motion.form
				className='space-y-6'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.5 }}>
				{/* Name field */}
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
						placeholder='Full name'
						className='w-full pl-10 pr-4 py-3 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-500 auth-input'
						whileFocus={{ scale: 1.02 }}
						transition={{ duration: 0.2 }}
					/>
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
						placeholder='Email address'
						className='w-full pl-10 pr-4 py-3 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-500 auth-input'
						whileFocus={{ scale: 1.02 }}
						transition={{ duration: 0.2 }}
					/>
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
						placeholder='Password'
						className='w-full pl-10 pr-4 py-3 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-500 auth-input'
						whileFocus={{ scale: 1.02 }}
						transition={{ duration: 0.2 }}
					/>
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
						placeholder='Confirm password'
						className='w-full pl-10 pr-4 py-3 border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none text-gray-500 auth-input'
						whileFocus={{ scale: 1.02 }}
						transition={{ duration: 0.2 }}
					/>
				</motion.div>

				{/* Sign up button */}
				<motion.button
					type='submit'
					className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200'
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.9, duration: 0.5 }}
					whileHover={{ scale: 1.05, y: -2 }}
					whileTap={{ scale: 0.95 }}>
					Sign Up
				</motion.button>
			</motion.form>

			{/* Login link */}
			<motion.div
				className='text-center mt-6'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.0, duration: 0.5 }}>
				<span className='text-gray-600'>or </span>
				<motion.a
					href='/login'
					className='text-blue-500 hover:text-blue-600 font-medium'
					whileHover={{ scale: 1.1, color: '#2563eb' }}
					whileTap={{ scale: 0.95 }}>
					Login
				</motion.a>
			</motion.div>

			{/* Terms */}
			<motion.div
				className='text-center mt-4'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.1, duration: 0.5 }}>
				<p className='text-gray-400 text-sm'>
					By signing up, you agree to our{' '}
					<motion.a
						href='#'
						className='text-blue-500 hover:text-blue-600'
						whileHover={{ scale: 1.05, color: '#2563eb' }}
						whileTap={{ scale: 0.95 }}>
						Terms of Service
					</motion.a>
				</p>
			</motion.div>
		</motion.div>
	);
}
