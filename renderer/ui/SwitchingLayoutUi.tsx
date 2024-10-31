'use client';
import { useSession } from 'next-auth/react';
import { useLayout } from '../hooks';
import { SwitchingLayoutUiProps } from '../interfaces';
import { EditLayout, LoginLayout, TopLayout } from '../layouts';
import { useEffect } from 'react';
import { LoadingLayout } from '../layouts/loadingLayout';

export const SwitchingLayoutUi = ({ children }: SwitchingLayoutUiProps) => {
	const {
		EditLeftBarTableAreaRef,
		EditReactFlowAreaRef,
		EditFooterAddColumnIconRef,
		EditRightPopperRef,
		windowMode,
		setSelectedTable,
	} = useLayout();
	const { data: session, status } = useSession();

	useEffect(() => {
		const handleDisplayClick = (event: MouseEvent) => {
			if (
				EditLeftBarTableAreaRef.current &&
				EditReactFlowAreaRef.current &&
				EditFooterAddColumnIconRef.current &&
				EditRightPopperRef.current
			) {
				const isClickOutsideReactFlow = !EditReactFlowAreaRef.current.contains(
					event.target as Node
				);
				const isClickOutsideLeftBarTableArea =
					!EditLeftBarTableAreaRef.current.contains(event.target as Node);
				const isClickOutsideEditFooterAddColumnIcon =
					!EditFooterAddColumnIconRef.current.contains(event.target as Node);
				const isClickOutsideRightPopper = !EditRightPopperRef.current.contains(
					event.target as Node
				);
				if (
					isClickOutsideReactFlow &&
					isClickOutsideLeftBarTableArea &&
					isClickOutsideEditFooterAddColumnIcon &&
					isClickOutsideRightPopper
				) {
					setSelectedTable(null);
				}
			}
		};
		document.addEventListener('click', handleDisplayClick);
		return () => {
			document.removeEventListener('click', handleDisplayClick);
		};
	}, []); // eslint-disable-line

	if (status === 'loading') {
		return <LoadingLayout>{children}</LoadingLayout>;
	}

	return (
		<>
			{!session || !session.user ? (
				<LoginLayout>{children}</LoginLayout>
			) : windowMode === 'top' ? (
				<TopLayout>{children}</TopLayout>
			) : windowMode === 'edit' ? (
				<EditLayout>{children}</EditLayout>
			) : (
				<></>
			)}
		</>
	);
};
