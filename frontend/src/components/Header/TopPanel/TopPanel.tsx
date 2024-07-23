

import Logo from '../Logo/Logo';
import PanelActions from '../PanelActions/PanelActions';
import styles from './TopPanel.module.css';
import { TopPanelProps } from './TopPanel.props';
import cn from 'classnames';

function TopPanel({className}: TopPanelProps) {
	return (
		<div className={cn(styles['main__header'], className)}>
			<div className={cn(styles['main-inner__header'])}>
				<Logo/>
				<PanelActions/>
			</div>
		</div>
	);
}

export default TopPanel;