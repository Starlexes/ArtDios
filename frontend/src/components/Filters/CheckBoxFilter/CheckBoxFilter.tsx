import { ChangeEvent, useState } from 'react';
import Input from '../../Header/Input/Input';
import styles from './CheckBoxFilter.module.css';
import { CheckBoxFilterProps } from './CheckBoxFilter.props';
import cn from 'classnames';
import { checked } from '../../../utils/constants';

function CheckBoxFilter({ className, name, desc}: CheckBoxFilterProps) {

	const [isChecked, setIsChecked] = useState<boolean>(false);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
	};

	return (
		<label className={cn(styles['checkbox-filter'], className)}>
			<div className={cn(styles['checkbox-area'])}>
				{isChecked && checked()}
			</div>
			<Input name={name} type='checkbox'
				checked={isChecked} className={cn(styles['checkbox-item'])}
				onChange={onChange}
			/>
			<span>
				{desc}
			</span>
		</label>
		
		
	);
}


export default CheckBoxFilter;