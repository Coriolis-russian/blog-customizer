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
			// закрывать только если в состоянии "открыто"
			if (
				isOpen &&
				target instanceof Node &&
				!contentElements.find((node) => node.current?.contains(target))
			) {
				console.log('close!', isOpen);
				onChange?.(false);
			}
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [onChange, isOpen]);
};
