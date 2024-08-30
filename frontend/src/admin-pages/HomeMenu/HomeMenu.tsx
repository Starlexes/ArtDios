
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import ModelItem from '../../admin-components/ModelItem/ModelItem';
import ModelItems from '../../admin-components/ModelItems/ModelItems';
import { adminEditCategory, adminEditCategoryMenuRoute, adminEditPopularProducts, adminEditPromotions, adminHomeRoute, adminRoute } from '../../utils/constants';
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

					<ModelItem link={adminRoute+adminHomeRoute}>
					Редактирование товаров
					</ModelItem>

					<ModelItem link={adminEditPopularProducts+adminEditCategoryMenuRoute}>
					Популярные товары
					</ModelItem>

					<ModelItem link={adminEditPromotions+adminEditCategoryMenuRoute}>
					Акции
					</ModelItem>

					<ModelItem link={adminRoute+adminHomeRoute}>
					Контакты
					</ModelItem>

					<ModelItem link={adminRoute+adminHomeRoute}>
					Галерея
					</ModelItem>
				</ModelItems>
				
		
			</div>
		</section>
	
	);

}

export default HomeMenu;