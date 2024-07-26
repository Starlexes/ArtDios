import styles from './MainPanel.module.css';
import cn from 'classnames';
import { MainPanelProps } from './MainPanel.props';


function MainPanel({className}: MainPanelProps) {


	return (
		<main className={cn(styles['main'], className)}>
			<>
			</>
		</main>
	);
}

export default MainPanel;