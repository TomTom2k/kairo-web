import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
	const t = useTranslations('home');

	return (
		<div className='min-h-screen flex flex-col items-center justify-center p-8'>
			<LanguageSwitcher />
			<h1 className='text-4xl font-bold mb-4'>{t('title')}</h1>
			<p className='text-lg text-gray-600'>{t('description')}</p>
		</div>
	);
}
