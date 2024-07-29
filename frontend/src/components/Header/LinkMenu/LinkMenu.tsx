import styles from './LinkMenu.module.css';
import NavigationList from '../NavigationList/NavigationList';
import { Link } from '../NavigationList/NavigationList.props';
import cn from 'classnames';
import Button from '../Button/Button';
import CategoryList from '../CategoryList/CategoryList';
import { useState } from 'react';

const links: Link[] = [
	{id: 1, link: '/', children: 'Главная', type: 'main', className: 'nav-menu' },
	{id: 2, link: '/service', children: 'Услуги', type: 'main', className: 'nav-menu' },
	{id: 3, link: '/promotions', children: 'Акции', type: 'main', className: 'nav-menu' },
	{id: 4, link: '/gallery', children: 'Галерея', type: 'main', className: 'nav-menu' },
	{id: 5, link: '/about', children: 'О компании', type: 'main', className: 'nav-menu' }
];

function LinkMenu() {
	
	const [isClicked, setIsClicked] = useState<boolean>(false);

	const handleClick = () => {
		setIsClicked(prevState => !prevState);
	};

	const handleMouseLeave = () => {
		setIsClicked(false);
	};

	return (
		<div className={cn(styles.bottom__header)} onMouseLeave={handleMouseLeave}>
			<Button className='catalog' onClick={handleClick} isActive={isClicked}>
				<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="20" height="4" rx="2" fill="white" />
					<rect y="6" width="20" height="4" rx="2" fill="white" />
					<rect y="12" width="20" height="4" rx="2" fill="white" />
				</svg>
        Каталог
			</Button>
			<NavigationList links={links} className={cn(styles['link-menu'])} onMouseEnter={handleMouseLeave} />
			<CategoryList isActive={isClicked} />
		</div>
	);
}

export default LinkMenu;