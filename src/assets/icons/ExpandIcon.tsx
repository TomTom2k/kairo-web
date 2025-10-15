import React from 'react';
import { Icon, IconProps } from './Icon';

export const ExpandIcon: React.FC<Omit<IconProps, 'children'>> = (props) => {
	return (
		<Icon {...props}>
			<path d='M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4' />
		</Icon>
	);
};
