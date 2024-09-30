import arrow from 'src/images/arrow.svg';

import clsx from 'clsx';
import styles from './ArrowButton.module.scss';
import { forwardRef, PropsWithoutRef } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
};

export const ArrowButton = forwardRef<
	HTMLDivElement,
	PropsWithoutRef<ArrowButtonProps>
>(function ArrowButton(props, ref) {
	const { isOpen, onClick } = props;
	return (
		/* Не забываем указывать role и aria-label атрибуты для интерактивных элементов */
		<div
			ref={ref}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</div>
	);
});
