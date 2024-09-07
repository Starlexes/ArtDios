import useScrollToTop from '../../hooks/useScrollToTop';
import { checkAuthenticated } from '../../utils/help-funcs';
import AdminFooter from '../AdminFooter/AdminFooter';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminMainPanel from '../AdminMainPanel/AdminMainPanel';
import styles from './AdminLayout.module.css';
import cn from 'classnames';

function AdminLayout() {
	useScrollToTop();
	
	return (
		<div className={cn(styles['layout'])}>
			<AdminHeader/>
			<AdminMainPanel/>

			{ checkAuthenticated() &&
				<AdminFooter/>
			}
		</div>
		
	);
}

export default AdminLayout;