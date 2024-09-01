
import { useEffect, useState} from 'react';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import styles from './EditAddress.module.css';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NewItemLayout from '../../admin-components/NewItemLayout/NewItemLayout';
import { EditAddressProps } from './EditAddress.props';
import ItemCardInputArea from '../../admin-components/ItemCardInputArea/ItemCardInputArea';
import ItemCardInputLabel from '../../admin-components/ItemCardInputLabel/ItemCardInputLabel';
import CardEditItemActions from '../../admin-components/CardEditItemActions/CardEditItemActions';
import CardEditItem from '../../admin-components/CardEditItem/CardEditItem';
import { addItemPlus } from '../../utils/constants';
import AddItemButton from '../../admin-components/AddItemButton/AddItemButton';
import { addAddress, deleteAddress, fetchAddress, updateAddress } from '../../slices/addressSlice';


function EditAddress({className }: EditAddressProps) {

	const {isLoading, addresses} = useAppSelector((state: RootState) => state.address);
	const [newItemClicked, setNewItemClicked] = useState<boolean>(false);
	
	const dispatch = useAppDispatch();

	const onClickAccept = (id: number | undefined, address: string) => {
		if (id) {
			dispatch(updateAddress({id: id, data: {address: address}}));		
		}
	};

	const onDelete = (id: number) => {
		dispatch(deleteAddress(id));
	};

	const onClickAddItem = (address: string) => {
		dispatch(addAddress({address: address}));
		setNewItemClicked(false);
	};

	useEffect(() => {
		if (addresses.length === 0) {
			dispatch(fetchAddress());
		}
	}, [dispatch, addresses.length]);

	return (
		
		<section>
			<div className={cn(styles['address-items'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Адрес</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Адрес
				</AdminPageHead>

				<NewItemLayout>
					
					{isLoading? <Spinner/> :
																				
						<ItemCardInputArea>
							<ItemCardInputLabel>Адрес:</ItemCardInputLabel>
							{addresses.map(address => (
								<CardEditItemActions key={address.id}>
									<CardEditItem content={address.address} idItem={address.id}
										deleteMessage={`адрес: "${address.address}"`} onClickAccept={onClickAccept}
										onDelete={onDelete} placeholder='Адрес...'/>										
								</CardEditItemActions>
							))}

							{ newItemClicked?
								<CardEditItem
									onClickAdd={onClickAddItem}
									onRemoveItem={() => setNewItemClicked(!newItemClicked)} placeholder='Адрес...' newItem={true}/>
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

export default EditAddress;

