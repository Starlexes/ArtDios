import { useEffect} from 'react';
import NavigationList from '../NavigationList/NavigationList';
import { Link } from '../NavigationList/NavigationList.props';
import styles from './Navigation.module.css';
import { NavigationProps } from './Navigation.props';
import cn from 'classnames';
import axios from 'axios';
import { RootState } from '../../../store';
import { setPhones } from '../../../slices/contactSlice';
import { useSelector, useDispatch } from 'react-redux';

const links: Link[] = [
	{id: 1, link: '#', children: 'Доставка и оплата', type: 'main', className: 'contact-text'},
	{id: 2, link: '#', children: 'Возврат товара', type: 'main', className: 'contact-text'},
	{id: 3, link: '#', children: 'Контакты', type: 'main', className: 'contact-text'},
	{id: 4, type: 'social' }
];

function Navigation({className}: NavigationProps) {

	const phones = useSelector((state: RootState) => state.phones.phones);
	const dispatch = useDispatch();
	
	
	useEffect(() => {
		axios.get('/api/phones/')
			.then(response => {
				const data = response.data;

				if (data && Array.isArray(data)) {
					const modifData: Link[] = data.map((item, index) => ({
						children: item.number,
						link: `tel:${item.number}`,
						type: 'main',
						className: 'phone-num',
						id: links.length+index+ 1
					}));
					
					dispatch(setPhones(modifData.slice(0, 2)));
					
				}
			})
			.catch(error => {
				console.error('There was an error fetching the data!', error);
			});
	}, [dispatch]);

	console.log(phones);
	return (
		<div className={cn(styles['navigation__header'], className)}>
			<NavigationList links={phones}/>
		</div>
	);
}

export default Navigation;