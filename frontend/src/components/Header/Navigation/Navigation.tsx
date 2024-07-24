import NavigationList from '../NavigationList/NavigationList';
import { Link } from '../NavigationList/NavigationList.props';
import styles from './Navigation.module.css';
import { NavigationProps } from './Navigation.props';
import cn from 'classnames';

function Navigation({className}: NavigationProps) {

	const links: Link[] = [
		{ link: '#', children: 'Доставка и оплата', type: 'main', className: 'contact-text'},
		{ link: '#', children: 'Возврат товара', type: 'main', className: 'contact-text'},
		{ link: '#', children: 'Контакты', type: 'main', className: 'contact-text'},
		{ type: 'social' },
		{ link: 'tel:8 (800) 988-89-89', children: '8 (800) 988-89-89', type: 'main', className: 'phone-num' },
		{ link: 'tel:+7 (978) 888 98 99', children: '+7 (978) 888 98 99', type: 'main', className: 'phone-num' }
	];

	return (
		<div className={cn(styles['navigation__header'], className)}>
			<NavigationList links={links}/>
		</div>
	);
}

export default Navigation;