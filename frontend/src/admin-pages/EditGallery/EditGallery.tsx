
import { useEffect, useState} from 'react';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import styles from './EditGallery.module.css';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NewItemLayout from '../../admin-components/NewItemLayout/NewItemLayout';
import { EditGalleryProps } from './EditGallery.props';
import { addItemPlus } from '../../utils/constants';
import AddItemButton from '../../admin-components/AddItemButton/AddItemButton';
import { addGallery, deleteGallery, fetchGallery, updateGallery } from '../../slices/gallerySlice';
import CardEditGallery from '../../admin-components/CardEditGallery/CardEditGallery';


function EditGallery({className }: EditGalleryProps) {

	const {isLoading, gallery} = useAppSelector((state: RootState) => state.gallery);
	const [newItemClicked, setNewItemClicked] = useState<boolean>(false);
	
	const dispatch = useAppDispatch();

	const onClickAccept = (id:number, name?: string, description?: string, image?: File | null) => {
		if (id) {
			const formData = new FormData();
			description && formData.append('description', description);
			image && formData.append('image', image);
			name && formData.append('name', name);
			dispatch(updateGallery({id: id, data: formData}));
		}
	};

	const onDelete = (id: number) => {
		dispatch(deleteGallery(id));
	};

	const onClickAddItem = (name: string, description: string, image: File | null) => {
		if (name && description && image) {
			const formData = new FormData();
			formData.append('image', image);
			formData.append('name', name);
			formData.append('description', description);
			dispatch(addGallery(formData));
		}
		setNewItemClicked(false);
	};

	const onClickAdd = () => {
		setNewItemClicked(!newItemClicked);
	};

	useEffect(() => {
		if (gallery.length === 0) {
			dispatch(fetchGallery());
		}
	}, [dispatch, gallery.length]);

	return (
		
		<section>
			<div className={cn(styles['gallery-items'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Галерея</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Галерея
				</AdminPageHead>

				<NewItemLayout>
					
					{isLoading? <Spinner/> :
																				
						gallery.map(item => (
							<CardEditGallery galleryItem={item} onClickAccept={onClickAccept} 
								onDelete={onDelete} key={item.gallery_id}/>
						))																												
					}

					{newItemClicked? 
                        
						<CardEditGallery newItem={true} onClickAddItem={onClickAddItem} onClickAdd={onClickAdd}/>
						:
						<AddItemButton shape='circle' className={cn(styles['action-btn'])}
							onClick={onClickAdd}>
							{addItemPlus()}
						</AddItemButton>
					}

				</NewItemLayout>
				
				
			</div>
		</section>
	
	);

}

export default EditGallery;

