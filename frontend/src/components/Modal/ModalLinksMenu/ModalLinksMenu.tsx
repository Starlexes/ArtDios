
import NavigationList from '../../Header/NavigationList/NavigationList';
import NavigationListItem from '../../Header/NavigationListItem/NavigationListItem';
import NavItem from '../../Header/NavItem/NavItem';
import styles from './ModalLinksMenu.module.css';
import cn from 'classnames';
import { ModalLinksMenuProps } from './ModalLinksMenu.props';
import { galleryRoute, promotionRoute, serviceRoute } from '../../../utils/constants';

function ModalLinksMenu({ className }: ModalLinksMenuProps) {

	return (
		<div>
			<NavigationList className={cn(styles['links-menu'], className)}>
				<NavigationListItem key={1}>
					<NavItem className={cn(styles['nav-menu'])} to={'/'}>
				Главная
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={2}>
					<NavItem className={cn(styles['nav-menu'])} to={serviceRoute}>
				Услуги
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={3}>
					<NavItem className={cn(styles['nav-menu'])} to={promotionRoute}>
				Акции
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={4}>
					<NavItem className={cn(styles['nav-menu'])} to={galleryRoute}>
				Галерея
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={5}>
					<NavItem className={cn(styles['nav-menu'])} to={'/about'}>
				О компании
					</NavItem>
				</NavigationListItem>

			</NavigationList>
		</div>
				
	);
}

export default ModalLinksMenu;