import ButtonOrderCall from '../../ButtonOrderCall/ButtonOrderCall';
import MediaBurger from '../MediaBurger/MediaBurger';
import MediaSearchButton from '../MediaSearchButton/MediaSearchButton';
import styles from './MediaActionPanel.module.css';
import { MediaActionPanelProps } from './MediaActionPanel.props';
import cn from 'classnames';

function MediaActionPanel({className}: MediaActionPanelProps) {
	return (
		<div className={cn(styles['media-panel'], className)}>
			<ButtonOrderCall/>
			<MediaSearchButton/>
			<MediaBurger/>
		</div>
	);
}

export default MediaActionPanel;