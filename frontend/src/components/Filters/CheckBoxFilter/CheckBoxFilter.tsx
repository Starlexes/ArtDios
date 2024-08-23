import { ChangeEvent, useEffect, useState } from 'react';
import Input from '../../Header/Input/Input';
import styles from './CheckBoxFilter.module.css';
import { CheckBoxFilterProps } from './CheckBoxFilter.props';
import cn from 'classnames';
import { checked } from '../../../utils/constants';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import { useDispatch } from 'react-redux';
import { setClearClick, setSubmitFilterParams } from '../../../slices/buttonSlice';


function CheckBoxFilter({decsParams, propertyName, className, name, desc}: CheckBoxFilterProps) {
	const dispatch = useDispatch();
	const descExists = decsParams.find(item => item === desc);

	const initial = descExists? true: false;

	const [isChecked, setIsChecked] = useState<boolean>(initial);

	const {isClicked: toClear} = useAppSelector((state: RootState) => state.buttons.actionClearButton);
	const {chars} = useAppSelector((state: RootState) => state.buttons.actionSubmitButton.filterparams);

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		setIsChecked(checked);
		if (toClear) {
			dispatch(setClearClick(false));
		}

		const exists = chars?.some(obj => 
			obj.name === propertyName && obj.description === desc
		);
	
		if (exists && !checked) {
		
			const updatedArray = chars?.filter(obj => 
				!(obj.name === propertyName && obj.description === desc)
			);
			
			dispatch(setSubmitFilterParams({ chars: updatedArray }));
			
		} else if (checked) {
			const newArray = [
				...(chars ?? []),
				{ name: propertyName, description: desc }
			];
		
			dispatch(setSubmitFilterParams({ chars: newArray }));
			
		}
	};
	

	useEffect(() => {
		if (toClear) {
			setIsChecked(false);			
		}
	}, [toClear]);


	return (
		
			
		<div className={cn(styles['checkbox-filter'], className)}>
			<div className={cn(styles['checkbox-area'])}>
				{isChecked && checked()}
			</div>
			<Input name={name} type='checkbox'
				checked={isChecked} className={cn(styles['checkbox-item'])}
				onChange={onChange}
			/>
			<label className={cn(styles['checkbox-label'])}>
				<span className={cn(styles['checkbox-desc'])}>
					{desc}
				</span>
			</label>
		</div>
	
		
	);
}


export default CheckBoxFilter;