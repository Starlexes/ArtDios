import styles from './LinkMenu.module.css';
import NavigationList from '../NavigationList/NavigationList';
import { Link } from '../NavigationList/NavigationList.props';
import cn from 'classnames';
import Button from '../Button/Button';



function LinkMenu() {
	
	const links: Link[] = [
		{ link: '#', children: 'Главная', type: 'main', className: 'nav-menu' },
		{ link: '#', children: 'Услуги', type: 'main', className: 'nav-menu' },
		{ link: '#', children: 'Акции', type: 'main', className: 'nav-menu' },
		{ link: '#', children: 'Галерея', type: 'main', className: 'nav-menu' },
		{ link: '#', children: 'О компании', type: 'main', className: 'nav-menu' }
	];

	return (
		<div className={cn(styles['bottom__header'])}>
			<Button className='catalog'>
				<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="20" height="4" rx="2" fill="white"/>
					<rect y="6" width="20" height="4" rx="2" fill="white"/>
					<rect y="12" width="20" height="4" rx="2" fill="white"/>
				</svg>
                    Каталог
			</Button>
			<NavigationList links={links} className='link-menu'/>
		</div>
	);
}

export default LinkMenu;