
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import ModelItem from '../../admin-components/ModelItem/ModelItem';
import ModelItems from '../../admin-components/ModelItems/ModelItems';
import { addPlus, adminEditCategory, adminEditCategoryRoute, adminEditProductTypesRoute, adminEditSubCategoryRoute, adminHomeRoute, adminRoute } from '../../utils/constants';
import styles from './EditCategoryMenu.module.css';
import { EditCategoryMenuProps } from './EditCategoryMenu.props';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';


function EditCategoryMenu({className }: EditCategoryMenuProps) {

	
	return (
		
		<section>
			<div className={cn(styles['edit-category'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Редактирование категорий</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                Редактирование категорий
				</AdminPageHead>
                
				<ModelItems>
					<ModelItem link={adminRoute+adminHomeRoute+adminEditCategory+adminEditProductTypesRoute} className={cn(styles['edit-model'])} linkClassName={cn(styles['edit-link'])}>
                    
					Вид товара
						{addPlus()}
					</ModelItem>

					<ModelItem link={adminRoute+adminHomeRoute+adminEditCategory+adminEditCategoryRoute} className={cn(styles['edit-model'])} linkClassName={cn(styles['edit-link'])}>
					Добавить категорию
						{addPlus()}
					</ModelItem>

					<ModelItem link={adminRoute+adminHomeRoute+adminEditCategory+adminEditSubCategoryRoute} className={cn(styles['edit-model'])} linkClassName={cn(styles['edit-link'])}>
					Добавить подкатегорию
						{addPlus()}
					</ModelItem>

					
				</ModelItems>
				
		
			</div>
		</section>
	
	);

}

export default EditCategoryMenu;