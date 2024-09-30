import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	defaultSettings: ArticleStateType;
	applySettingsHandler: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultSettings,
	applySettingsHandler,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const arrowBtnElementRef = useRef<HTMLDivElement>(null);
	const panelElementRef = useRef<HTMLElement>(null);
	const [settings, setSettings] = useState<ArticleStateType>({
		...defaultSettings,
	});

	useOutsideClickClose({
		isOpen,
		contentElements: [arrowBtnElementRef, panelElementRef],
		onChange: setOpen,
	});

	function makeUpdateOptionHandler(
		option: keyof ArticleStateType
	): (value: OptionType) => void {
		return (value) =>
			setSettings((prevState) => {
				return { ...prevState, [option]: value };
			});
	}

	return (
		<>
			<ArrowButton
				ref={arrowBtnElementRef}
				isOpen={isOpen}
				onClick={() => setOpen((isOpen) => !isOpen)}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={panelElementRef}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						applySettingsHandler(settings);
					}}>
					<Text as={'h2'} size={31} uppercase weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={settings.fontFamilyOption}
						onChange={makeUpdateOptionHandler('fontFamilyOption')}
					/>
					<RadioGroup
						name={'text-font-size'}
						options={fontSizeOptions}
						selected={settings.fontSizeOption}
						title='размер шрифта'
						onChange={makeUpdateOptionHandler('fontSizeOption')}
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={settings.fontColor}
						onChange={makeUpdateOptionHandler('fontColor')}
					/>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={settings.backgroundColor}
						onChange={makeUpdateOptionHandler('backgroundColor')}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={settings.contentWidth}
						onChange={makeUpdateOptionHandler('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setSettings({ ...defaultSettings });
								applySettingsHandler({ ...defaultSettings });
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
