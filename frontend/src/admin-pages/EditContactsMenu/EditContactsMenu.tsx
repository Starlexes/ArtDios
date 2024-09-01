
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import ModelItem from '../../admin-components/ModelItem/ModelItem';
import ModelItems from '../../admin-components/ModelItems/ModelItems';
import { adminEditAddresses, adminEditContacts, adminEditEmails, adminEditPhones, adminEditWorkingHours, adminHomeRoute, adminRoute } from '../../utils/constants';
import styles from './EditContactsMenu.module.css';
import { EditContactsMenuProps } from './EditContactsMenu.props';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';


function EditContactsMenu({className }: EditContactsMenuProps) {

	return (
		<section>
			<div className={cn(styles['menu'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Контакты</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Контакты
				</AdminPageHead>
                
				<ModelItems>
					<ModelItem link={adminRoute+adminHomeRoute+adminEditContacts+adminEditPhones}>    
					Телефоны
					</ModelItem>

					<ModelItem link={adminRoute+adminHomeRoute+adminEditContacts+adminEditEmails}>
					Email
					</ModelItem>

					<ModelItem link={adminRoute+adminHomeRoute+adminEditContacts+adminEditAddresses}>
					Адрес
					</ModelItem>

					<ModelItem link={adminRoute+adminHomeRoute+adminEditContacts+adminEditWorkingHours}>
					Время работы
					</ModelItem>			
				</ModelItems>
			</div>
		</section>
	);
}

export default EditContactsMenu;