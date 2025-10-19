import { useTranslations } from 'next-intl';
import { getErrorMessage } from '@/lib/axiosConfig';
import { useCallback } from 'react';

export function useErrorHandler() {
	const t = useTranslations();

	const handleError = useCallback(
		(error: unknown): string => {
			return getErrorMessage(error, {
				errors: {
					'400': t('errors.400'),
					'401': t('errors.401'),
					'403': t('errors.403'),
					'404': t('errors.404'),
					'500': t('errors.500'),
				},
			});
		},
		[t]
	);

	return { handleError };
}
