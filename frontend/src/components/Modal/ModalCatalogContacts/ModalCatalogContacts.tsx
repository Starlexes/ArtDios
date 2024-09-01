import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import NavItem from '../../Header/NavItem/NavItem';
import NavSocial from '../../Header/NavSocial/NavSocial';
import styles from './ModalCatalogContacts.module.css';
import { ModalCatalogContactsProps } from './ModalCatalogContacts.props';
import cn from 'classnames';
import { fetchContacts } from '../../../slices/contactSlice';


function ModalCatalogContacts({ className }: ModalCatalogContactsProps) {
    
	const phones = useAppSelector((state: RootState) => state.contacts.contacts.phones);
	const {isLoading} = useAppSelector((state: RootState) => state.contacts);
	const mainPhone = phones.length > 0? phones[0]: '';
	const dispatch = useAppDispatch();
	const [hasFetched, setHasFetched] = useState(false);

	useEffect(() => {
		if (!hasFetched && !isLoading) {
			setHasFetched(true);
			dispatch(fetchContacts());
		}
		
	},  [dispatch, isLoading, hasFetched]);

	return (
		<div className={cn(styles['modal-contacts'], className)}>
			<div className={cn(styles['contacts-body'])}>
				<NavItem className={cn(styles['phone-num'])} to={`tel:${mainPhone}`}>
					{mainPhone} 
				</NavItem>

				<NavSocial className={cn(styles['social-logo'])}/>
			</div>
		</div>
	);
}

export default ModalCatalogContacts;