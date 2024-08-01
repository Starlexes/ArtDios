
import styles from './MediaButton.module.css';
import { MediaButtonProps } from './MediaButton.props';
import Button from '../../Header/Button/Button';
import cn from 'classnames';


function MediaButton({className, children, onClick}: MediaButtonProps) {

	return (
		<Button className={cn(styles['media-btn'], className)} onClick={onClick}>{children}</Button>
	);
}

export default MediaButton;