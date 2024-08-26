
import LogOutButton from '../../admin-components/LogOutButton/LogOutButton';
import { checkAuthenticated } from '../../utils/help-funcs';
import styles from './AdminHeader.module.css';
import cn from 'classnames';


function AdminHeader() {

	return (
		<header>
			
			<div className={cn(styles['header'])}>
				<div className={cn(styles['header-content'])}>
					<span>
                    Админ-панель -
					</span>
					<span className={cn(styles['logo'])}>АРТДИОС</span>
				</div>
				{checkAuthenticated() && <LogOutButton/>}
			</div>
		</header>
	);
}

export default AdminHeader;