
import { useEffect, useState} from 'react';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import styles from './EditEmails.module.css';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NewItemLayout from '../../admin-components/NewItemLayout/NewItemLayout';
import { EditEmailsProps } from './EditEmails.props';
import ItemCardInputArea from '../../admin-components/ItemCardInputArea/ItemCardInputArea';
import ItemCardInputLabel from '../../admin-components/ItemCardInputLabel/ItemCardInputLabel';
import CardEditItemActions from '../../admin-components/CardEditItemActions/CardEditItemActions';
import CardEditItem from '../../admin-components/CardEditItem/CardEditItem';
import { addItemPlus } from '../../utils/constants';
import AddItemButton from '../../admin-components/AddItemButton/AddItemButton';
import { addEmail, deleteEmail, fetchEmail, updateEmail } from '../../slices/emailSlice';


function EditEmails({className }: EditEmailsProps) {

	const {isLoading, emails} = useAppSelector((state: RootState) => state.emails);
	const [newItemClicked, setNewItemClicked] = useState<boolean>(false);
	const [isFetched, setIsFetched] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const onClickAccept = (id: number | undefined, email: string) => {
		if (id) {
			dispatch(updateEmail({id: id, data: {email: email}}));		
		}
	};

	const onDelete = (id: number) => {
		dispatch(deleteEmail(id));
	};

	const onClickAddItem = (email: string) => {
		dispatch(addEmail({email: email}));
		setNewItemClicked(false);
	};

	useEffect(() => {
		if (!isFetched) {
			setIsFetched(true);
			if (emails.length === 0 && !isLoading) {
				dispatch(fetchEmail());
			}
		}
	}, [dispatch, emails.length, isLoading, isFetched]);

	return (
		
		<section>
			<div className={cn(styles['email-items'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Email</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Email
				</AdminPageHead>

				<NewItemLayout>
					
					{isLoading? <Spinner/> :
																				
						<ItemCardInputArea>
							<ItemCardInputLabel>Email:</ItemCardInputLabel>
							{emails.length > 0 && emails.map(email => (
								<CardEditItemActions key={email.id}>
									<CardEditItem content={email.email} idItem={email.id}
										deleteMessage={`почту: "${email.email}"`} onClickAccept={onClickAccept}
										onDelete={onDelete} placeholder='example@mail.ru'/>										
								</CardEditItemActions>
							))}

							{ newItemClicked?
								<CardEditItem
									onClickAdd={onClickAddItem}
									onRemoveItem={() => setNewItemClicked(!newItemClicked)} placeholder='example@mail.ru'
									newItem={true} type='email'/>
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

export default EditEmails;

