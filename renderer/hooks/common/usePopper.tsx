'use client';
import { useEffect, useRef, useState } from 'react';
import { UsePopperProps } from '../../interfaces';

export const usePopper = <T, P extends HTMLElement>({
	onOpen,
	onClose,
}: UsePopperProps) => {
	const [anchorEl, setAnchorEl] = useState<T | null>(null);
	const popperRef = useRef<HTMLDivElement | null>(null);
	const parentRef = useRef<P | null>(null);

	const handleOpen = (event: React.MouseEvent<T>) => {
		const currentTarget = event.currentTarget;
		if (currentTarget) {
			if (onOpen) onOpen();
			setAnchorEl(currentTarget);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popperRef.current &&
				parentRef.current &&
				!popperRef.current.contains(event.target as Node) &&
				!parentRef.current.contains(event.target as Node)
			) {
				if (onClose) onClose();
				setAnchorEl(null);
			}
		};
		if (anchorEl) {
			document.addEventListener('click', handleClickOutside);
		} else {
			document.removeEventListener('click', handleClickOutside);
		}
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [anchorEl, onClose, parentRef]);

	return {
		anchorEl,
		setAnchorEl,
		popperRef,
		parentRef,
		handleOpen,
	};
};
