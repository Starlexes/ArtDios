
import { useMediaPredicate } from 'react-media-hook';
import Logo from '../../Header/Logo/Logo';
import NavigationList from '../../Header/NavigationList/NavigationList';
import NavigationListItem from '../../Header/NavigationListItem/NavigationListItem';
import NavItem from '../../Header/NavItem/NavItem';
import TextFooter from '../TextFooter/TextFooter';
import styles from './NavFooter.module.css';
import { NavFooterProps } from './NavFooter.props';
import cn from 'classnames';

function NavFooter({className, ...props }: NavFooterProps) {


	const matches = useMediaPredicate('(min-width: 881px)');

	return (
		<div className={cn(styles['nav-footer'], className)} {...props}>
			{matches? 
				<>
					<Logo className={cn(styles['logo-footer'])} isFooter={true}/>

					<NavigationList className={cn(styles['nav-footer-list'])}>

						<NavigationListItem key={1}>
							<TextFooter>
					&copy; 2024 - artdios.ru
							</TextFooter>
						</NavigationListItem>

						<NavigationListItem key={2}>
							<TextFooter>
						Все права защищены
							</TextFooter>
						</NavigationListItem>
				
						<NavigationListItem key={3}>
							<NavItem to='/' className={cn(styles['nav-footer-link'])}>
						Обработка персональных данных
							</NavItem>
						</NavigationListItem>

						<NavigationListItem key={4}>
							<NavItem to='/' className={cn(styles['nav-footer-link'])}>
						Публичная оферта
							</NavItem>
						</NavigationListItem>
						<NavigationListItem key={5}>
							<NavItem to='/' className={cn(styles['nav-footer-link'])}>
						Пользовательское соглашение
							</NavItem>
						</NavigationListItem>
				
					</NavigationList>
				</>: 
				<>
					

					<NavigationList className={cn(styles['nav-footer-list'])}>
						<NavigationListItem key={0}>
							<Logo className={cn(styles['logo-footer'])} isFooter={true}/>
						</NavigationListItem>

						<NavigationListItem key={1}>
							<TextFooter>
					&copy; 2024 - artdios.ru
							</TextFooter>
						</NavigationListItem>

						<NavigationListItem key={2}>
							<TextFooter>
						Все права защищены
							</TextFooter>
						</NavigationListItem>

						<NavigationListItem key={3}>
							<NavItem to='/' className={cn(styles['nav-footer-link'])}>
						Обработка персональных данных
							</NavItem>
						</NavigationListItem>

						<NavigationListItem key={4}>
							<NavItem to='/' className={cn(styles['nav-footer-link'])}>
						Публичная оферта
							</NavItem>
						</NavigationListItem>
						<NavigationListItem key={5}>
							<NavItem to='/' className={cn(styles['nav-footer-link'])}>
						Пользовательское соглашение
							</NavItem>
						</NavigationListItem>

					</NavigationList>
				</>
			}			
		</div>
	);
}

export default NavFooter;