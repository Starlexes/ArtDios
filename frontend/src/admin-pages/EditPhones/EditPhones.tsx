
import { useEffect, useState} from 'react';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import styles from './EditPhones.module.css';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NewItemLayout from '../../admin-components/NewItemLayout/NewItemLayout';
import { EditPhonesProps } from './EditPhones.props';
import { addPhone, deletePhone, fetchPhone, updatePhone } from '../../slices/phoneSlice';
import ItemCardInputArea from '../../admin-components/ItemCardInputArea/ItemCardInputArea';
import ItemCardInputLabel from '../../admin-components/ItemCardInputLabel/ItemCardInputLabel';
import CardEditItemActions from '../../admin-components/CardEditItemActions/CardEditItemActions';
import CardEditItem from '../../admin-components/CardEditItem/CardEditItem';
import { addItemPlus } from '../../utils/constants';
import AddItemButton from '../../admin-components/AddItemButton/AddItemButton';


function EditPhones({className }: EditPhonesProps) {

	const {isLoading, phones} = useAppSelector((state: RootState) => state.phones);
	const [newItemClicked, setNewItemClicked] = useState<boolean>(false);
	
	const dispatch = useAppDispatch();

	const onClickAccept = (id: number | undefined, number: string) => {
		if (id) {
			dispatch(updatePhone({id: id, data: {number: number}}));		
		}
	};

	const onDelete = (id: number) => {
		dispatch(deletePhone(id));
	};

	const onClickAddItem = (number: string) => {
		dispatch(addPhone({number: number}));
		setNewItemClicked(false);
	};

	useEffect(() => {
		if (phones.length === 0) {
			dispatch(fetchPhone());
		}
	}, [dispatch, phones.length]);

	return (
		
		<section>
			<div className={cn(styles['phones-items'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Телефоны</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Телефоны
				</AdminPageHead>

				<NewItemLayout>
					
					{isLoading? <Spinner/> :
																				
						<ItemCardInputArea>
							<ItemCardInputLabel>Телефоны:</ItemCardInputLabel>
							{phones.length > 0 && phones.map(phone => (
								<CardEditItemActions key={phone.id}>
									<CardEditItem content={phone.number} idItem={phone.id}
										deleteMessage={`телефон: "${phone.number}"`} onClickAccept={onClickAccept}
										onDelete={onDelete} placeholder='+7/8 ...'/>										
								</CardEditItemActions>
							))}

							{ newItemClicked?
								<CardEditItem
									onClickAdd={onClickAddItem}
									onRemoveItem={() => setNewItemClicked(!newItemClicked)} placeholder='+7/8 ...' newItem={true}/>
								:
								<AddItemButton shape='circle' className={cn(styles['action-btn'])}
									onClick={() => setNewItemClicked(!newItemClicked)}>
									{addItemPlus()}
								</AddItemButton>
							}
								
						</ItemCardInputArea>																						
						
					}
				</NewItemLayout>
				
				
			</div>
		</section>
	
	);

}

export default EditPhones;

