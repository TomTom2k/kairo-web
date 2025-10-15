'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useTransition } from 'react';

const languages = [
	{ code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
	{ code: 'en', label: 'English', flag: '🇬🇧' },
];

export default function LanguageSwitcher() {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	const [isPending, startTransition] = useTransition();
	const [isOpen, setIsOpen] = useState(false);

	const currentLocale = params.locale as string;
	const currentLanguage = languages.find(
		(lang) => lang.code === currentLocale
	);

	const handleLanguageChange = (locale: string) => {
		startTransition(() => {
			router.replace(pathname, { locale: locale as any });
		});
		setIsOpen(false);
	};

	return (
		<div className='relative'>
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className='flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors'
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				disabled={isPending}>
				<span className='text-xl'>{currentLanguage?.flag}</span>
				<span className='text-sm font-medium text-gray-700'>
					{currentLanguage?.code.toUpperCase()}
				</span>
				<motion.svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-4 w-4 text-gray-600'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.2 }}>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M19 9l-7 7-7-7'
					/>
				</motion.svg>
			</motion.button>

			{isOpen && (
				<>
					<div
						className='fixed inset-0 z-10'
						onClick={() => setIsOpen(false)}
					/>
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className='absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-20'>
						{languages.map((language) => (
							<motion.button
								key={language.code}
								onClick={() =>
									handleLanguageChange(language.code)
								}
								className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg ${
									currentLocale === language.code
										? 'bg-blue-50 text-blue-600'
										: 'text-gray-700'
								}`}
								whileHover={{ x: 5 }}
								disabled={isPending}>
								<span className='text-xl'>{language.flag}</span>
								<span className='text-sm font-medium'>
									{language.label}
								</span>
								{currentLocale === language.code && (
									<motion.svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5 ml-auto'
										viewBox='0 0 20 20'
										fill='currentColor'
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										transition={{ type: 'spring' }}>
										<path
											fillRule='evenodd'
											d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
											clipRule='evenodd'
										/>
									</motion.svg>
								)}
							</motion.button>
						))}
					</motion.div>
				</>
			)}
		</div>
	);
}
