
import NavigationList from '../NavigationList/NavigationList';
import styles from './Navigation.module.css';
import { NavigationProps } from './Navigation.props';
import cn from 'classnames';
import { RootState, selectPhones } from '../../../store';
import { useEffect } from 'react';
import { fetchContacts } from '../../../slices/contactSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import NavigationListItem from '../NavigationListItem/NavigationListItem';
import NavItem from '../NavItem/NavItem';
import NavSocial from '../NavSocial/NavSocial';
import { contactsRoute, deliveryPaymentsRoute } from '../../../utils/constants';


function Navigation({className}: NavigationProps) {

	const phones = useAppSelector((state: RootState) => selectPhones(state));
	const {contacts, isLoading} = useAppSelector((state: RootState) => state.contacts);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if ((contacts.phones.length === 0 || contacts.emails.length === 0) && !isLoading) {
			dispatch(fetchContacts());
		}
		
	},  [dispatch, contacts.phones.length, contacts.emails.length, isLoading]);



	return (
		<div className={cn(styles['navigation__header'], className)}>
			<NavigationList>
				<NavigationListItem key={1}>
					<NavItem className='contact-text' to={deliveryPaymentsRoute}>
						Доставка и оплата
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={2}>
					<NavItem isHashLink={true} className='contact-text' to={deliveryPaymentsRoute+'#returning-product'}>
						Возврат товара
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={3}>
					<NavItem className='contact-text' to={contactsRoute}>
						Контакты
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={4}>
					<NavSocial/>
				</NavigationListItem>
					
				{
					phones.map((item, index) => (
						<NavigationListItem key={5+index}>
							<NavItem className={cn(styles['phone-num'])} to={`tel:${item}`}>
								{item}
							</NavItem>
						</NavigationListItem>
					))
				}
				
			</NavigationList>
		</div>
	);
}

export default Navigation;
