
import LogOutButton from '../../admin-components/LogOutButton/LogOutButton';
import NavItem from '../../components/Header/NavItem/NavItem';
import { adminHomeRoute, adminRoute } from '../../utils/constants';
import { checkAuthenticated } from '../../utils/help-funcs';
import styles from './AdminHeader.module.css';
import cn from 'classnames';


function AdminHeader() {

	return (
		<header>
			
			<div className={cn(styles['header'])}>
				<NavItem to={adminRoute+adminHomeRoute}>
					<div className={cn(styles['header-content'])}>
						<span>
                    Админ-панель -
						</span>
						<span className={cn(styles['logo'])}>АРТДИОС</span>
					</div>
				</NavItem>
				{checkAuthenticated() && <LogOutButton/>}
			</div>
			
		</header>
	);
}

export default AdminHeader;