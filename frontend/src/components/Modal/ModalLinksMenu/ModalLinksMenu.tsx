
import NavigationList from '../../Header/NavigationList/NavigationList';
import NavigationListItem from '../../Header/NavigationListItem/NavigationListItem';
import NavItem from '../../Header/NavItem/NavItem';
import styles from './ModalLinksMenu.module.css';
import cn from 'classnames';
import { ModalLinksMenuProps } from './ModalLinksMenu.props';
import { aboutRoute, contactsRoute, galleryRoute, promotionRoute, serviceRoute } from '../../../utils/constants';

function ModalLinksMenu({onClose, className }: ModalLinksMenuProps) {

	return (
		<div>
			<NavigationList className={cn(styles['links-menu'], className)}>
				<NavigationListItem key={1}>
					<NavItem onClick={onClose} className={cn(styles['nav-menu'])} to={'/'}>
				Главная
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={2}>
					<NavItem onClick={onClose} className={cn(styles['nav-menu'])} to={serviceRoute}>
				Услуги
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={3}>
					<NavItem onClick={onClose} className={cn(styles['nav-menu'])} to={promotionRoute}>
				Акции
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={4}>
					<NavItem onClick={onClose} className={cn(styles['nav-menu'])} to={galleryRoute}>
				Галерея
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={5}>
					<NavItem onClick={onClose} className={cn(styles['nav-menu'])} to={contactsRoute}>
				Контакты
					</NavItem>
				</NavigationListItem>

				<NavigationListItem key={6}>
					<NavItem onClick={onClose} className={cn(styles['nav-menu'])} to={aboutRoute}>
				О компании
					</NavItem>
				</NavigationListItem>

			</NavigationList>
		</div>
				
	);
}

export default ModalLinksMenu;