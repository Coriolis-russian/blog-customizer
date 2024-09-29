import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

export const ArticleParamsForm = () => {
	const [isOpen, setOpen] = useState(false);
	const formElementRef = useRef<HTMLFormElement | null>(null);
	const arrowBtnElementRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen,
		contentElements: [formElementRef, arrowBtnElementRef],
		onChange: setOpen,
	});

	return (
		<>
			<ArrowButton
				ref={arrowBtnElementRef}
				isOpen={isOpen}
				onClick={() => setOpen((isOpen) => !isOpen)}
			/>
			<aside
				className={clsx({ [styles.container_open]: isOpen }, styles.container)}>
				<form className={styles.form} ref={formElementRef}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
