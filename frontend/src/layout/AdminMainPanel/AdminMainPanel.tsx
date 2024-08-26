import styles from './AdminMainPanel.module.css';
import cn from 'classnames';
import { AdminMainPanelProps } from './AdminMainPanel.props';
import { Outlet } from 'react-router-dom';


function AdminMainPanel({className}: AdminMainPanelProps) {

	return (
		<main>
			<div className={cn(styles['main'], className)}>
				<Outlet/>
			</div>
		</main>
	);
}

export default AdminMainPanel;