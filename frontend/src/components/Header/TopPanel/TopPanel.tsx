

import { useMediaPredicate } from 'react-media-hook';
import Logo from '../Logo/Logo';
import PanelActions from '../PanelActions/PanelActions';
import styles from './TopPanel.module.css';
import { TopPanelProps } from './TopPanel.props';
import cn from 'classnames';
import MediaActionPanel from '../../Media/MediaActionPanel/MediaActionPanel';

function TopPanel({className}: TopPanelProps) {

	const matches = useMediaPredicate('(min-width: 881px)');

	return (
		<div className={cn(styles['main__header'], className)}>
			<div className={cn(styles['main-inner__header'])}>
				<Logo/>
				{
					matches? <PanelActions/>: <MediaActionPanel/>
				}
			</div>
		</div>
	);
}

export default TopPanel;