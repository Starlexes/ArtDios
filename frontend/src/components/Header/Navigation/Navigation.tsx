
import NavigationList from '../NavigationList/NavigationList';
import { Link } from '../NavigationList/NavigationList.props';
import styles from './Navigation.module.css';
import { NavigationProps } from './Navigation.props';
import cn from 'classnames';
import { RootState, selectPhones } from '../../../store';
import { useEffect } from 'react';
import { fetchContacts } from '../../../slices/contactSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

const initial: Link[] = [
	{id: 1, link: '#', children: 'Доставка и оплата', type: 'main', className: 'contact-text'},
	{id: 2, link: '#', children: 'Возврат товара', type: 'main', className: 'contact-text'},
	{id: 3, link: '#', children: 'Контакты', type: 'main', className: 'contact-text'},
	{id: 4, type: 'social' }
];

function Navigation({className}: NavigationProps) {

	const phones = useAppSelector((state: RootState) => selectPhones(state));
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);
	
	const links: Link[] = [
		...initial,
		...phones.map((item, index) => ({
			id: initial.length + index + 1,
			link: `tel:${item}`,
			children: item,
			type: 'main',
			className: 'phone-num'
		} as Link))
	];

	return (
		<div className={cn(styles['navigation__header'], className)}>
			<NavigationList links={links}/>
		</div>
	);
}

export default Navigation;
