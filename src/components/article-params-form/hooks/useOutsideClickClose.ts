import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	contentElements: React.RefObject<HTMLElement>[];
};

export const useOutsideClickClose = ({
	isOpen,
	contentElements,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			console.log(target);
			if (
				isOpen &&
				target instanceof Node &&
				!contentElements.find((node) => node.current?.contains(target))
			) {
				onChange?.(false);
			}
		};

		if (isOpen) {
			window.addEventListener('mousedown', handleClick);

			return () => {
				window.removeEventListener('mousedown', handleClick);
			};
		}
	}, [onChange, isOpen]);
};
