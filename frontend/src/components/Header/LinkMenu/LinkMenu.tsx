import styles from './LinkMenu.module.css';
import NavigationList from '../NavigationList/NavigationList';
import cn from 'classnames';
import Button from '../Button/Button';
import CategoryList from '../CategoryList/CategoryList';
import { useState } from 'react';
import NavigationListItem from '../NavigationListItem/NavigationListItem';
import NavItem from '../NavItem/NavItem';



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
			<NavigationList className={cn(styles['link-menu'])} onMouseEnter={handleMouseLeave}>

				<NavigationListItem key={1}>
					<NavItem className={cn(styles['nav-menu'])} to={'/'}>
						Главная
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={2}>
					<NavItem className={cn(styles['nav-menu'])} to={'/service'}>
						Услуги
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={3}>
					<NavItem className={cn(styles['nav-menu'])} to={'/promotions'}>
						Акции
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={4}>
					<NavItem className={cn(styles['nav-menu'])} to={'/gallery'}>
						Галерея
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={5}>
					<NavItem className={cn(styles['nav-menu'])} to={'/about'}>
						О компании
					</NavItem>
				</NavigationListItem>

			</NavigationList>
			<CategoryList isActive={isClicked} />
		</div>
	);
}

export default LinkMenu;