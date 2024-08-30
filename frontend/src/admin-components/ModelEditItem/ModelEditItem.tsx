import { ChangeEvent, useState } from 'react';
import styles from './ModelEditItem.module.css';
import { ModelEditItemProps } from './ModelEditItem.props';
import cn from 'classnames';
import ModelEditInput from '../ModelEditInput/ModelEditInput';
import ModelEditActions from '../ModelEditActions/ModelEditActions';
import ModelAcceptButton from '../ModelAcceptButton/ModelAcceptButton';
import ModelEditButton from '../ModelEditButton/ModelEditButton';
import ModalAskDelete from '../ModalAskDelete/ModalAskDelete';
import AddPromoButton from '../AddPromoButton/AddPromoButton';
import { addPlus } from '../../utils/constants';
import AddPromoField from '../AddPromoField/AddPromoField';

function ModelEditItem({ className, modelItem, onClickAccept,
	showToggleItem, onClickDelete, onClickDiscount}: ModelEditItemProps) {
		
	const [inputValue, setInputValue] = useState<string>(String(modelItem.name));
	const [editClicked, setEditClicked] = useState<boolean>(false);
	const [showClicked, setShowClicked] = useState<boolean>(!modelItem.is_show);
	const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
	const [promoClicked, setPromoClicked] = useState<boolean>(false);
	const [discount, setDiscount] = useState<number>(0);

	const onClickEdit = () => {
		if (!editClicked) {
			setInputValue(modelItem.name? modelItem.name: '');
		}
		setEditClicked(true);
	};
	
	const onClickShow = () => {
		showToggleItem(modelItem.id, showClicked);
		setShowClicked(!showClicked);
	};

	const onClickPromo = () => {
		setPromoClicked(!promoClicked);
		'discount' in modelItem && modelItem.discount
		&& onClickDiscount && onClickDiscount(modelItem.id, null);
	};
		
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const onClickDeleteButton = () => {
		setDeleteClicked(!deleteClicked);
	};

	const onChangePromo = (e: ChangeEvent<HTMLInputElement>) => {
		setDiscount(Number(e.target.value));
	};

	const onClickAcceptPromo = () => {
		const convertedDiscount = Math.round(discount);
		onClickDiscount && onClickDiscount(modelItem.id, convertedDiscount);
	};


	return (
		
		<div className={cn(styles['model-edit'], {
			[styles['accept']]: editClicked,
			[styles['show-out']]: showClicked
		},className)}>
				
			{editClicked? 
				<ModelEditInput value={inputValue}
					onChange={onChange}/>
				: modelItem.name
			}	
									
			<ModelEditActions>
				{'discount' in modelItem && (
					promoClicked && !modelItem.discount?
						<AddPromoField onClickAdd={onClickPromo} onChangePromo={onChangePromo} onClickSubmit={onClickAcceptPromo}/>
						:
						<AddPromoButton onClick={onClickPromo}>
							{modelItem.discount? `Убрать (${modelItem.discount}%)` : (
								<>
									Скидка
									{addPlus()}
								</>
							)
							}
						</AddPromoButton>
				)
				}

				{editClicked? 
					<ModelAcceptButton onClick={() => {
						onClickAccept(modelItem.id, inputValue);
						setEditClicked(false);
						
					}}>
						Применить
					</ModelAcceptButton>
					: 
					<ModelEditButton typeAction='main' 
						onClick={onClickEdit}>
						Редактировать
					</ModelEditButton>
				}
											
				<ModelEditButton typeAction='main' onClick={onClickShow}
					className={cn({
						[styles['show-btn']]: showClicked
					})}>
					{
						showClicked? 'Показать': 'Скрыть'
					}
					
				</ModelEditButton>

				<ModelEditButton typeAction='delete' onClick={onClickDeleteButton}>
					Удалить
				</ModelEditButton>
											
										
			</ModelEditActions>
			
			
			<ModalAskDelete isOpen={deleteClicked} closeModal={onClickDeleteButton}
				message={`"${String(modelItem.name)}"`} idItem={modelItem.id}
				onDelete={onClickDelete}/>
			
		
		</div>
           
	);

}

export default ModelEditItem;