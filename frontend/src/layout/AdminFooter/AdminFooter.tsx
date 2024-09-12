
import NavItem from '../../components/Header/NavItem/NavItem';
import { adminEditCatalog, adminEditCategory, adminEditCategoryMenuRoute, adminEditContacts, adminEditGallery, adminEditPopularProducts, adminEditPromotions } from '../../utils/constants';
import styles from './AdminFooter.module.css';
import cn from 'classnames';


function AdminFooter() {

	return (
		<footer>
			
			<div className={cn(styles['footer'])}>
				<div className={cn(styles['footer-content'])}>
					<NavItem to={adminEditCategory+adminEditCategoryMenuRoute} className={cn(styles['footer-item'])}>
					Редактирование категорий
					</NavItem>

					<NavItem to={adminEditCatalog+adminEditCategoryMenuRoute} className={cn(styles['footer-item'])}>
					Редактирование товаров
					</NavItem>

					<NavItem to={adminEditPopularProducts+adminEditCategoryMenuRoute} className={cn(styles['footer-item'])}>
					Популярные товары
					</NavItem>

					<NavItem to={adminEditPromotions+adminEditCategoryMenuRoute} className={cn(styles['footer-item'])}>
					Акции
					</NavItem>

					<NavItem to={adminEditContacts+adminEditCategoryMenuRoute} className={cn(styles['footer-item'])}>
					Контакты
					</NavItem>

					<NavItem to={adminEditGallery} className={cn(styles['footer-item'])}>
					Галерея
					</NavItem>
				</div>
			</div>
			
		</footer>
	);
}

export default AdminFooter;