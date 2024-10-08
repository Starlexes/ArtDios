
import { useMediaPredicate } from 'react-media-hook';
import Logo from '../../Header/Logo/Logo';
import NavigationList from '../../Header/NavigationList/NavigationList';
import NavigationListItem from '../../Header/NavigationListItem/NavigationListItem';
import NavItem from '../../Header/NavItem/NavItem';
import TextFooter from '../TextFooter/TextFooter';
import styles from './NavFooter.module.css';
import { NavFooterProps } from './NavFooter.props';
import cn from 'classnames';
import { customContractRoute, opdPageRoute, publicOfferRoute } from '../../../utils/constants';
import { getCurrentYear } from '../../../utils/help-funcs';


function NavFooter({className, ...props }: NavFooterProps) {

	const matches = useMediaPredicate('(min-width: 881px)');

	const onClick = () => {
		window.scrollTo(0, 0);
	};

	const logoItem = (
		<NavigationListItem key={0}>
			<Logo className={cn(styles['logo-footer'])} isFooter={true} onClick={onClick}/>
		</NavigationListItem>
	);

	return (
		<div className={cn(styles['nav-footer'], className)} {...props}>
			{matches && logoItem}

			<NavigationList className={cn(styles['nav-footer-list'])}>

				{!matches && logoItem}

				<NavigationListItem key={1}>
					<TextFooter>
					&copy; {getCurrentYear()} - artdios.ru
					</TextFooter>
				</NavigationListItem>

				<NavigationListItem key={2}>
					<TextFooter>
						Все права защищены
					</TextFooter>
				</NavigationListItem>
				
				<NavigationListItem key={3}>
					<NavItem to={opdPageRoute} className={cn(styles['nav-footer-link'])}>
						Обработка персональных данных
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={4}>
					<NavItem to={publicOfferRoute} className={cn(styles['nav-footer-link'])}>
						Публичная оферта
					</NavItem>
				</NavigationListItem>
				<NavigationListItem key={5}>
					<NavItem to={customContractRoute} className={cn(styles['nav-footer-link'])}>
						Пользовательское соглашение
					</NavItem>
				</NavigationListItem>
				
			</NavigationList>
							
		</div>
	);
}

export default NavFooter;