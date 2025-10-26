import enErrors from '@/messages/modules/errors/en.json';
import viErrors from '@/messages/modules/errors/vi.json';

// Type for error messages - tự động extract tất cả error messages từ JSON
type ErrorMessages = Record<string, string>;

// Helper function để flatten error messages từ JSON structure
function flattenErrors(
	errors: Record<string, unknown>,
	prefix = 'errors'
): ErrorMessages {
	const result: ErrorMessages = {};

	for (const [key, value] of Object.entries(errors)) {
		const fullKey = `${prefix}.${key}`;

		if (typeof value === 'string') {
			result[fullKey] = value;
		} else if (typeof value === 'object' && value !== null) {
			// Recursively flatten nested objects
			const nested = flattenErrors(
				value as Record<string, unknown>,
				fullKey
			);
			Object.assign(result, nested);
		}
	}

	return result;
}

// Extract error messages from JSON files
const extractErrorMessages = (
	messages: Record<string, unknown>
): ErrorMessages => {
	const errors = messages.errors as Record<string, unknown>;
	return flattenErrors(errors);
};

// Error messages from JSON files
const ERROR_MESSAGES = {
	vi: extractErrorMessages(viErrors),
	en: extractErrorMessages(enErrors),
};

// Helper function để lấy locale từ URL path
function getLocaleFromPath(): string {
	if (typeof window === 'undefined') return 'vi';

	const pathname = window.location.pathname;
	const localeMatch = pathname.match(/^\/(en|vi)(\/|$)/);

	return localeMatch ? localeMatch[1] : 'vi';
}

// Helper function để translate error message
export function translateErrorMessage(messageKey: string): string {
	const locale = getLocaleFromPath();
	const messages =
		ERROR_MESSAGES[locale as keyof typeof ERROR_MESSAGES] ||
		ERROR_MESSAGES.vi;

	// Check if the message key exists
	const translatedMessage = messages[messageKey];

	if (translatedMessage) {
		return translatedMessage;
	}

	// If not found and it's a 400 error, try to find a fallback
	if (messageKey.startsWith('errors.400.')) {
		return messages['errors.400.GENERAL'] || messageKey;
	}

	// If not found and it's other status codes, try general pattern
	const parts = messageKey.split('.');
	if (parts.length === 2 && parts[0] === 'errors') {
		// For errors like errors.401, errors.500
		const statusCode = parts[1];
		return messages[messageKey] || messageKey;
	}

	// Return the key itself if no translation found
	return messageKey;
}

// Export error messages for other uses
export { ERROR_MESSAGES };
