import React from 'react';

export interface IconProps {
	className?: string;
	size?: number | string;
	color?: string;
	strokeWidth?: number;
	children: React.ReactNode;
}

export const Icon: React.FC<IconProps> = ({
	className = '',
	size = 24,
	color = 'currentColor',
	strokeWidth = 2,
	children,
}) => {
	return (
		<svg
			className={className}
			width={size}
			height={size}
			fill='none'
			stroke={color}
			strokeWidth={strokeWidth}
			strokeLinecap='round'
			strokeLinejoin='round'
			viewBox='0 0 24 24'>
			{children}
		</svg>
	);
};
