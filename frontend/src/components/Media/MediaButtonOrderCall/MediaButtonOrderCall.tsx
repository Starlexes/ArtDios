
import MediaButton from '../MediaButton/MediaButton';
import styles from './MediaButtonOrderCall.module.css';
import { MediaButtonOrderCallProps } from './MediaButtonOrderCall.props';

import cn from 'classnames';



function MediaButtonOrderCall({className, ...props}: MediaButtonOrderCallProps) {

	
	return (
		<MediaButton className={cn(styles['media-order'], className)} {...props}>
			<img src="/media/phone.svg" alt="Иконка телефона" />
		</MediaButton>
	);
}

export default MediaButtonOrderCall;