
import { useState } from 'react';
import { filtersIcon } from '../../../../utils/constants';
import Button from '../../../Header/Button/Button';
import FiltersMedia from '../FiltersMedia/FiltersMedia';
import styles from './FiltersButton.module.css';
import { FiltersButtonProps } from './FiltersButton.props';
import cn from 'classnames';


function FiltersButton({minPrice, maxPrice, chars, className, productLength }: FiltersButtonProps) {

	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const onClose = () => {
		setModalOpen(false);
	};

	const onClick = () => {
		setModalOpen(true);
	};

	return (
		<>
			<Button onClick={onClick} className={cn(styles['filters-btn'], className)}>
				<div className={cn(styles['filters-content'])}>
            Фильтры
					{filtersIcon()}
				</div>
			</Button>

			<FiltersMedia isOpen={modalOpen} closeModal={onClose}
				minPrice={minPrice} maxPrice={maxPrice} chars={chars} productLength={productLength}/>
		</>
	);
}

export default FiltersButton;