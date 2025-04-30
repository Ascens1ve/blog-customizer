import { useState, forwardRef } from 'react';
import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export interface ArrowButtonProps {
	clickCall: OnClick;
}

export const ArrowButton = forwardRef<HTMLDivElement | null, ArrowButtonProps>(({clickCall}, ref) => {

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.currentTarget.classList.toggle(styles.container_open);
		event.currentTarget.querySelector('img')?.classList.toggle(styles.arrow_open);
		clickCall();
	}

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={styles.container}
			onClick={handleClick}
			ref={ref}
		>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={styles.arrow}
			/>
		</div>
	);
});
