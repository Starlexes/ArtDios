import { ChangeEvent, useState } from 'react';
import { cancelMinus } from '../../utils/constants';
import ModelAcceptButton from '../ModelAcceptButton/ModelAcceptButton';
import ModelEditInput from '../ModelEditInput/ModelEditInput';
import styles from './AddPromoField.module.css';
import { AddPromoFieldProps } from './AddPromoField.props';
import cn from 'classnames';
import AddPromoButton from '../AddPromoButton/AddPromoButton';


function AddPromoField({ className, onClickSubmit, onClickAdd, onChangePromo }: AddPromoFieldProps) {

	const [inputValue, setInputValue] = useState<string>('');
	const [isErrors, setIsErrors] = useState<boolean>(false);
	
	const onClick = () => {
		setIsErrors(!inputValue);
		inputValue && onClickSubmit();	
	};


	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		onChangePromo(e);
	};


	return (
		
		<div className={cn(styles['promo-field'], className)}>
			<AddPromoButton onClick={onClickAdd} className={cn(styles['promo-btn'])}>
                Скидка
				{cancelMinus()}
			</AddPromoButton>

			<ModelEditInput className={cn(styles['promo-input'], {
				[styles['errors']]: isErrors
			})} onChange={onChange} placeholder='Введите число в %' type='number'/>

			
			<ModelAcceptButton className={cn(styles['add-submit'])} onClick={onClick}>
            Применить
			</ModelAcceptButton>
		</div>
           
	);

}

export default AddPromoField;