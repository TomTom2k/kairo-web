// Import all module messages
import enCommon from '@/messages/modules/common/en.json';
import viCommon from '@/messages/modules/common/vi.json';
import enAuth from '@/messages/modules/auth/en.json';
import viAuth from '@/messages/modules/auth/vi.json';
import enDashboard from '@/messages/modules/dashboard/en.json';
import viDashboard from '@/messages/modules/dashboard/vi.json';
import enHome from '@/messages/modules/home/en.json';
import viHome from '@/messages/modules/home/vi.json';
import enErrors from '@/messages/modules/errors/en.json';
import viErrors from '@/messages/modules/errors/vi.json';

// Merge all messages for each locale
const enMessages = {
	...enCommon,
	...enAuth,
	...enDashboard,
	...enHome,
	...enErrors,
};

const viMessages = {
	...viCommon,
	...viAuth,
	...viDashboard,
	...viHome,
	...viErrors,
};

// Export merged messages
export { enMessages, viMessages };

// Export individual modules for specific use cases
export {
	enCommon,
	viCommon,
	enAuth,
	viAuth,
	enDashboard,
	viDashboard,
	enHome,
	viHome,
	enErrors,
	viErrors,
};
