import { ChangeEvent, useState } from 'react';
import { removeItemMinus } from '../../utils/constants';
import AddItemButton from '../AddItemButton/AddItemButton';
import ItemActions from '../ItemActions/ItemActions';
import ItemCardInput from '../ItemCardInput/ItemCardInput';
import styles from './ItemCardCharacteristic.module.css';
import { ItemCardCharacteristicProps } from './ItemCardCharacteristic.props';
import cn from 'classnames';
import ModalAskDelete from '../ModalAskDelete/ModalAskDelete';


function ItemCardCharacteristic({ className, orderNumber, charItem,
	acceptClicked=false, onChangeChars, onClickDelete,
	existChar=false, onDeleteCharacteristic}: ItemCardCharacteristicProps) {

	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [isDeleteClicked, setIsDeleteClicked] = useState<boolean>(false);


	return (
		<ItemActions>
			<div className={cn(styles['item-card'], className)}>		
				<span className={cn(styles['order'])}>№ {orderNumber+1}</span>

				<div className={cn(styles['char-item'])}>
					<span>Название:</span>
					<ItemCardInput dark={false} onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setName(e.target.value);
						onChangeChars(orderNumber, 'property', e.target.value);
					}}
					errors={acceptClicked && !name} placeholder='Название...'
					value={existChar && !name? charItem?.property :name} className={cn(styles['input-item'])}/>
				</div>

				<div className={cn(styles['char-item'])}>
					<span>Описание:</span>
					<ItemCardInput dark={false} onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setDescription(e.target.value);
						onChangeChars(orderNumber, 'value', e.target.value);
					}}
					errors={acceptClicked && !description} placeholder='Описание...'
					value={existChar && !description? charItem?.value: description} className={cn(styles['input-item'])}/>
				</div>
			</div>

			<AddItemButton shape='circle' className={cn(styles['action-btn'])} onClick={() => {
				setIsDeleteClicked(!isDeleteClicked);
				charItem?.new && onClickDelete && onClickDelete(Number(charItem?.id));
			}}>
				{removeItemMinus()}
			</AddItemButton>

			<ModalAskDelete isOpen={existChar && isDeleteClicked} closeModal={() => setIsDeleteClicked(!isDeleteClicked)}
				message={`характеристику "${charItem?.property} - ${charItem?.value}"`} idItem={charItem?.id}
				onDelete={onDeleteCharacteristic}/>
		</ItemActions>
           
	);

}

export default ItemCardCharacteristic;