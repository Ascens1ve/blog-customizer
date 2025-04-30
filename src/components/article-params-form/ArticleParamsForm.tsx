import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { CSSProperties, FormEvent, useEffect, useRef, useState } from 'react';
import { Select } from '../select';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

export const ArticleParamsForm = ({onChange}: {onChange: (state: ArticleStateType) => void}) => {

	const containerRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLDivElement | null>(null);
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

	const handleClick = () => {
		containerRef.current?.classList.toggle(styles.container_open);
	}

	const handleFontChange = (selected: OptionType) => {
		setArticleState({
			...articleState,
			fontFamilyOption: selected,
		});
	}

	const handleFontSizeChange = (value: OptionType) => {
		setArticleState({
			...articleState,
			fontSizeOption: value,
		});
	}

	const handleFontColorChange = (selected: OptionType) => {
		setArticleState({
			...articleState,
			fontColor: selected,
		});
	}

	const handleBackgroundColorChange = (selected: OptionType) => {
		setArticleState({
			...articleState,
			backgroundColor: selected,
		})
	}

	const handleContentWidthChange =  (selected: OptionType) => {
		setArticleState({
			...articleState,
			contentWidth: selected,
		})
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onChange(articleState);
	}

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState(defaultArticleState);
		onChange(defaultArticleState);
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && buttonRef.current 
				&& !containerRef.current.contains(event.target as Node)
				&& !buttonRef.current.contains(event.target as Node)
				&& containerRef.current.classList.contains(styles.container_open)
			) {
				buttonRef.current.click();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		}
	}, []);
	
	return (
		<>
			<ArrowButton clickCall={handleClick} ref={buttonRef}/>
			<aside
				className={styles.container} ref={containerRef}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<h2 
						className={styles.title} 
						style={{'--font-family': defaultArticleState.fontFamilyOption.value} as CSSProperties}
					>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>
					<Select 
						selected={articleState.fontFamilyOption} 
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleFontChange}
					></Select>
					<RadioGroup  
						selected={articleState.fontSizeOption}
						options={fontSizeOptions} 
						name='font-size'
						title='Размер шрифта'
						onChange={handleFontSizeChange}
					></RadioGroup>
					<Select
						selected={articleState.fontColor}
						title='Цвет шрифта'
						options={fontColors}
						onChange={handleFontColorChange}
					></Select>
					<Separator></Separator>
					<Select
						selected={articleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleBackgroundColorChange}
					></Select>
					<Select
						selected={articleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleContentWidthChange}
					></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
