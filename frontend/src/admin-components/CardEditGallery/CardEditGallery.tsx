import { ChangeEvent, useState } from 'react';
import ModelEditButton from '../ModelEditButton/ModelEditButton';
import styles from './CardEditGallery.module.css';
import { CardEditGalleryProps } from './CardEditGallery.props';
import cn from 'classnames';
import ModelAcceptButton from '../ModelAcceptButton/ModelAcceptButton';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import ItemCardInputArea from '../ItemCardInputArea/ItemCardInputArea';
import ItemActions from '../ItemActions/ItemActions';
import AddItemButton from '../AddItemButton/AddItemButton';
import { removeItemMinus } from '../../utils/constants';
import ItemCardInputLabel from '../ItemCardInputLabel/ItemCardInputLabel';
import ItemCardInput from '../ItemCardInput/ItemCardInput';
import ItemCardAreaInput from '../ItemCardAreaInput/ItemCardAreaInput';
import ItemImagePreview from '../ItemImagePreview/ItemImagePreview';
import ModalAskDelete from '../ModalAskDelete/ModalAskDelete';

function CardEditGallery({ className, newItem=false, onClickAccept,
	onClickAddItem, onDelete, galleryItem, onClickAdd}: CardEditGalleryProps) {

	const [editClicked, setEditClicked] = useState<boolean>(false);
	const [acceptClicked, setAcceptClicked] = useState<boolean>(false);
	const [image, setImage] = useState<File | string | null>(null);
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [deleteClicked, setDeleteClicked] = useState<boolean>(false);

	const onClickEdit = () => {
		setEditClicked(!editClicked);
	};

	const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
		}
	};

	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(e.target.value);
	};

	const onClickDeleteButton = () => {
		setDeleteClicked(!deleteClicked);
		onClickAdd && onClickAdd();
	};


	return (
		<ItemActions>
			<ItemCardInputArea className={cn(className)}>

				<div className={cn(styles['gallery-parts'])}>
					<div className={cn(styles['gallery-items'])}>
						<div className={cn(styles['gallery-item'])}>
							<ItemCardInputLabel>Название:</ItemCardInputLabel>
							{
								editClicked || newItem? 
									<ItemCardInput placeholder='Название...' value={name? name: galleryItem?.name}
										errors={acceptClicked && !name} onChange={onChangeName}/>
									: name? name: galleryItem?.name
							}
							
						</div>

						<div className={cn(styles['gallery-item'])}>
							<ItemCardInputLabel>Описание:</ItemCardInputLabel>
							{editClicked || newItem? 
								<ItemCardAreaInput placeholder='Описание...' value={description? description: galleryItem?.description}
									errors={acceptClicked && !description} className={cn(styles['area-input'])}
									onChange={onChangeDescription}/>
								: <div className={cn(styles['area-input'])}>
									{description? description: galleryItem?.description}
								</div>
							}
							
						</div>

						{ 
							editClicked || newItem?		
								<ModelAcceptButton onClick={() => {
									setAcceptClicked(true);
									setEditClicked(false);		
									galleryItem && onClickAccept && onClickAccept(galleryItem.gallery_id, name? name: undefined, description? description: undefined, image? image as File: null);					
									newItem && name && description && image && onClickAddItem && onClickAddItem(name, description, image as File);
								}}>
				Применить
								</ModelAcceptButton>
								:
								<ModelEditButton typeAction='main' onClick={onClickEdit}>
				Редактировать
								</ModelEditButton>
						}

					</div>

					<ItemImagePreview image={image? image: galleryItem?.image} onChange={onChangeImage}
						errors={newItem && acceptClicked && !image} isShowInput={editClicked || newItem}/>
					
				</div>
			
				
				
			</ItemCardInputArea>

			<AddItemButton shape='circle' className={cn(styles['action-btn'])} onClick={onClickDeleteButton}>
				{removeItemMinus()}
			</AddItemButton>

			<ModalAskDelete isOpen={Boolean(galleryItem) && deleteClicked} closeModal={onClickDeleteButton}
				message={`галерею "${String(galleryItem?.name)}"`} idItem={galleryItem?.gallery_id}
				onDelete={onDelete}/>
		</ItemActions>	
	);

}

export default CardEditGallery;