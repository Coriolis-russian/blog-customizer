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
			if (
				target instanceof Node &&
				!contentElements.find((node) => node.current?.contains(target))
			) {
				onChange?.(false);
			}
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [onChange, isOpen]);
};
