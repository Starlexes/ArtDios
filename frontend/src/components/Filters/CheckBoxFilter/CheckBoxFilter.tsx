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


function CheckBoxFilter({propertyName, className, name, desc, isCategory=false}: CheckBoxFilterProps) {
	const dispatch = useDispatch();
	const {chars, category} = useAppSelector((state: RootState) => state.buttons.actionSubmitButton.filterparams);

	const descExists = isCategory? category?.find(item => item === desc): chars?.find(item => item.description === desc);
	const initial = descExists? true: false;

	const [isChecked, setIsChecked] = useState<boolean>(initial);

	const {isClicked: toClear} = useAppSelector((state: RootState) => state.buttons.actionClearButton);
	

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		setIsChecked(checked);
		if (toClear) {
			dispatch(setClearClick(false));
		}

		const exists = chars?.some(obj => 
			obj.name === propertyName && obj.description === desc
		);

		if (isCategory) {
			if (descExists && !checked) {
				const updatedArray = category?.filter(obj => 
					!(obj === desc)
				);
			
				dispatch(setSubmitFilterParams({ category: updatedArray }));
			}
			else if (checked) {
				
				const newArray = [
					...(category ?? []),
					desc
				];
		
				dispatch(setSubmitFilterParams({ category: newArray }));					
			}
		} else {
	
			if (exists && !checked) {
		
				const updatedArray = chars?.filter(obj => 
					!(obj.name === propertyName && obj.description === desc)
				);
			
				dispatch(setSubmitFilterParams({ chars: updatedArray }));
			
			} else if (checked) {
				const newArray = [
					...(chars ?? []),
					{ name: propertyName, description: desc as string }
				];
		
				dispatch(setSubmitFilterParams({ chars: newArray }));
			
			}
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
				<span className={cn(styles['checkbox-desc'], {
					[styles['category-desc']]: isCategory
				})}>
					{isCategory? propertyName: desc}
				</span>
			</label>
		</div>
	
		
	);
}


export default CheckBoxFilter;