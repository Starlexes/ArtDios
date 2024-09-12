
import {useAppSelector } from '../../../hooks';
import { RootState } from '../../../store';
import NavItem from '../../Header/NavItem/NavItem';
import NavSocial from '../../Header/NavSocial/NavSocial';
import styles from './ModalCatalogContacts.module.css';
import { ModalCatalogContactsProps } from './ModalCatalogContacts.props';
import cn from 'classnames';

function ModalCatalogContacts({ className }: ModalCatalogContactsProps) {
    
	const phones = useAppSelector((state: RootState) => state.contacts.contacts.phones);

	const mainPhone = phones.length > 0? phones[0]: '';
	
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