'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const DashboardPage = () => {
	const { logout, isAuthenticated, isLoading } = useAuth();
	const t = useTranslations();

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-lg'>{t('dashboard.loading')}</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-lg'>{t('dashboard.unauthorized')}</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='bg-white rounded-lg shadow-sm p-6'>
					<div className='flex justify-between items-center mb-6'>
						<h1 className='text-2xl font-bold text-gray-900'>
							{t('dashboard.title')}
						</h1>
						<motion.button
							onClick={logout}
							className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200'
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							{t('dashboard.logout')}
						</motion.button>
					</div>

					<div className='text-gray-600'>
						<p>{t('dashboard.welcome')}</p>
						<p className='mt-2'>{t('dashboard.loginSuccess')}</p>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default DashboardPage;
