import { ChangeEvent, useEffect, useState } from 'react';
import { removeItemMinus } from '../../utils/constants';
import AddItemButton from '../AddItemButton/AddItemButton';
import ModelEditButton from '../ModelEditButton/ModelEditButton';
import styles from './CardEditItem.module.css';
import { CardEditItemProps } from './CardEditItem.props';
import cn from 'classnames';
import ModelAcceptButton from '../ModelAcceptButton/ModelAcceptButton';
import ItemCardInput from '../ItemCardInput/ItemCardInput';
import ModalAskDelete from '../ModalAskDelete/ModalAskDelete';
import CardEditItemActions from '../CardEditItemActions/CardEditItemActions';


function CardEditItem({ className, content, onClickAccept, idItem,
	deleteMessage, onDelete, placeholder, newItem=false, onRemoveItem, onClickAdd}: CardEditItemProps) {

	const [editClicked, setEditClicked] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>(content? content: '');
	const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
	const [isErrors, setIsErrors] = useState<boolean>(false);

	const onClickEdit = () => {
		setEditClicked(!editClicked);
	};

	const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const onClickDelete = () => {
		setDeleteClicked(!deleteClicked);
	}; 

	useEffect(() => {
		newItem && inputValue && isErrors && setIsErrors(false);
	}, [newItem, inputValue, isErrors]);

	return (
		<CardEditItemActions>
			<div className={cn(styles['card-edit'], className)}>
				{
					editClicked || newItem? 
						<ItemCardInput onChange={onChangeInput}
							placeholder={placeholder} value={inputValue}
							className={cn(styles['content-input'])} errors={isErrors}/>   
						: content
				}
				{editClicked || newItem?
					<ModelAcceptButton onClick={() => {
						inputValue && onClickAccept && onClickAccept(idItem, inputValue);
						inputValue && onClickAdd && onClickAdd(inputValue);
						setEditClicked(false);
						newItem && !inputValue && setIsErrors(true);
						
					}}>
					Применить
					</ModelAcceptButton>
					:
					<ModelEditButton typeAction='main' onClick={onClickEdit}>
				Редактировать
					</ModelEditButton>
				}
				
			</div>
			<AddItemButton shape='circle' className={cn(styles['action-btn'])} onClick={newItem? onRemoveItem: onClickDelete}>
				{removeItemMinus()}
			</AddItemButton>

			<ModalAskDelete isOpen={newItem? false: deleteClicked} closeModal={onClickDelete}
				message={String(deleteMessage)} idItem={idItem}
				onDelete={onDelete}/>
		</CardEditItemActions>
	);

}

export default CardEditItem;