import { ChangeEvent, useEffect, useState } from 'react';
import { cancelMinus } from '../../utils/constants';
import AddItemButton from '../AddItemButton/AddItemButton';
import ModelAcceptButton from '../ModelAcceptButton/ModelAcceptButton';
import ModelEditInput from '../ModelEditInput/ModelEditInput';
import styles from './ModelAddField.module.css';
import { ModelAddFieldProps } from './ModelAddField.props';
import cn from 'classnames';
import { SingleValue } from 'react-select';
import { OptionType } from '../../components/Filters/Media/SortingOrderMedia/SortingOrderMedia';
import ItemsSelector from '../ItemsSelector/ItemsSelector';



function ModelAddField({ className, onClickSubmit, onClickAdd, productTypes=null, categories=null}: ModelAddFieldProps) {

	const [inputValue, setInputValue] = useState<string>('');
	const [isErrors, setIsErrors] = useState<boolean>(false);
	const [parent, setParent] = useState<number>(0);
	const [selectedProductType, setSelectedProductType] = useState<SingleValue<OptionType> | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<SingleValue<OptionType> | null>(null);
	const [acceptClicked, setAcceptClicked] = useState<boolean>(false);

	const onClick = () => {
		setAcceptClicked(true);

		if ((productTypes || categories) && inputValue && parent > 0) {
			onClickSubmit(inputValue, parent);
		} else if (!productTypes && !categories && inputValue) {
			onClickSubmit(inputValue, null);
		}

		setIsErrors(!inputValue);
		
	};


	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};


	useEffect(() => {
	
		if (categories && selectedCategory) {
			setParent(Number(selectedCategory.value));
		} 
		if (productTypes && !categories && selectedProductType) {
			setParent(Number(selectedProductType.value));
		}
	}, [selectedCategory, selectedProductType, categories, productTypes]);

	return (
		
		<div className={cn(styles['add-field'], className)}>
			<AddItemButton shape='rect' onClick={onClickAdd}>
                    Добавить
				{cancelMinus()}
			</AddItemButton>
			<ModelEditInput className={cn(styles['add-input'], {
				[styles['errors']]: isErrors
			})} onChange={onChange}/>

			{productTypes && productTypes.length > 0 && 

			<ItemsSelector onChangeOption={setSelectedProductType} defaultOption='Выбрать вид товара'
				optionLabels={productTypes.map(item => {
					return {id: item.id? item.id: 0, name: item.name? item.name: ''};
				})} selectErrors={acceptClicked && !selectedProductType && !selectedCategory}/>
			}

			{
				categories && categories.length > 0 &&
				<ItemsSelector onChangeOption={setSelectedCategory} defaultOption='Выбрать категорию'
					optionLabels={selectedProductType? categories.filter(item => item.parent === Number(selectedProductType?.value))
						.map(item => {
							return {id: item.id? item.id: 0, name: item.name? item.name: ''};
						}): categories.map(item => {
						return {id: item.id? item.id: 0, name: item.name? item.name: ''};
					})} selectErrors={acceptClicked && Boolean(selectedProductType) && !selectedCategory}/>
			}
			<ModelAcceptButton className={cn(styles['add-submit'])} onClick={onClick}>
            Применить
			</ModelAcceptButton>
		</div>
           
	);

}

export default ModelAddField;