
import MediaButton from '../MediaButton/MediaButton';
import styles from './MediaBurger.module.css';
import { MediaBurgerProps } from './MediaBurger.props';

import cn from 'classnames';


function MediaBurger({className}: MediaBurgerProps) {

	return (
		<MediaButton className={cn(styles['media-burger'], className)}>
			<img src="media/burger.svg" alt="Иконка телефона" />
		</MediaButton>
	);
}

export default MediaBurger;