
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import ModelItem from '../../admin-components/ModelItem/ModelItem';
import ModelItems from '../../admin-components/ModelItems/ModelItems';
import { adminEditCatalog, adminEditCategory, adminEditCategoryMenuRoute, adminEditContacts, adminEditGallery, adminEditPopularProducts, adminEditPromotions } from '../../utils/constants';
import styles from './HomeMenu.module.css';
import { HomeMenuProps } from './HomeMenu.props';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';


function HomeMenu({className }: HomeMenuProps) {

	
	return (
		
		<section>
			<div className={cn(styles['home-menu'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Главная</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Главная
				</AdminPageHead>
                
				<ModelItems>
					<ModelItem link={adminEditCategory+adminEditCategoryMenuRoute}>
					Редактирование категорий
					</ModelItem>

					<ModelItem link={adminEditCatalog+adminEditCategoryMenuRoute}>
					Редактирование товаров
					</ModelItem>

					<ModelItem link={adminEditPopularProducts+adminEditCategoryMenuRoute}>
					Популярные товары
					</ModelItem>

					<ModelItem link={adminEditPromotions+adminEditCategoryMenuRoute}>
					Акции
					</ModelItem>

					<ModelItem link={adminEditContacts+adminEditCategoryMenuRoute}>
					Контакты
					</ModelItem>

					<ModelItem link={adminEditGallery}>
					Галерея
					</ModelItem>
				</ModelItems>
				
		
			</div>
		</section>
	
	);

}

export default HomeMenu;