
import styles from './MediaButton.module.css';
import { MediaButtonProps } from './MediaButton.props';
import Button from '../../Header/Button/Button';
import cn from 'classnames';


function MediaButton({className, children, onClick, ...props}: MediaButtonProps) {

	return (
		<Button className={cn(styles['media-btn'], className)} onClick={onClick} {...props}>{children}</Button>
	);
}

export default MediaButton;