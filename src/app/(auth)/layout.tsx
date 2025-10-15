'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExpandIcon, RefreshIcon } from '@/assets/icons';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='min-h-screen bg-white relative overflow-hidden'>
			{/* Background shapes */}
			<div className='absolute inset-0'>
				{/* Large blue shape */}
				<motion.div
					className='absolute -bottom-20 -right-20 w-96 h-96 bg-blue-600 rounded-full opacity-20'
					animate={{
						y: [0, -30, 0],
						rotate: [12, 18, 12],
						scale: [1, 1.1, 1],
					}}
					transition={{
						duration: 8,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				/>

				{/* Teal shape */}
				<motion.div
					className='absolute top-20 -right-10 w-80 h-80 bg-teal-400 rounded-full opacity-30'
					animate={{
						y: [0, 25, 0],
						rotate: [-12, -18, -12],
						scale: [1, 0.9, 1],
					}}
					transition={{
						duration: 10,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 1,
					}}
				/>

				{/* Small blue circle */}
				<motion.div
					className='absolute bottom-0 left-1/2 w-32 h-32 bg-blue-700 rounded-full opacity-25'
					animate={{
						y: [0, -20, 0],
						x: [0, 10, 0],
						scale: [1, 1.2, 1],
					}}
					transition={{
						duration: 6,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 2,
					}}
					style={{ transform: 'translateX(-50%)' }}
				/>

				{/* Golden wavy line */}
				<motion.div
					className='absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-60'
					animate={{
						x: [0, 20, 0],
						opacity: [0.6, 0.8, 0.6],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: 'easeInOut',
					}}>
					<svg
						className='w-full h-full'
						viewBox='0 0 100 10'
						preserveAspectRatio='none'>
						<path
							d='M0,5 Q25,0 50,5 T100,5'
							stroke='currentColor'
							strokeWidth='2'
							fill='none'
						/>
					</svg>
				</motion.div>
			</div>

			{/* Main content */}
			<div className='relative z-10 flex items-center justify-center min-h-screen p-4'>
				{children}
			</div>

			{/* Bottom right icons */}
			<div className='absolute bottom-4 right-4 z-20 flex flex-col space-y-2'>
				<motion.button
					className='p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors'
					whileHover={{ scale: 1.1, rotate: 5 }}
					whileTap={{ scale: 0.95 }}
					animate={{
						y: [0, -5, 0],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 0.5,
					}}>
					<ExpandIcon className='w-4 h-4 text-gray-600' />
				</motion.button>
				<motion.button
					className='p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors'
					whileHover={{ scale: 1.1, rotate: -5 }}
					whileTap={{ scale: 0.95 }}
					animate={{
						y: [0, 5, 0],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 1,
					}}>
					<RefreshIcon className='w-4 h-4 text-gray-600' />
				</motion.button>
			</div>
		</div>
	);
}
