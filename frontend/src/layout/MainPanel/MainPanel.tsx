import styles from './MainPanel.module.css';
import cn from 'classnames';
import { MainPanelProps } from './MainPanel.props';
import { Outlet } from 'react-router-dom';

function MainPanel({className}: MainPanelProps) {


	return (
		<main className={cn(styles['main'], className)}>
			<Outlet/>
		</main>
	);
}

export default MainPanel;