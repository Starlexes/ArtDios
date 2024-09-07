import styles from './ItemCardInputArea.module.css';
import { ItemCardInputAreaProps } from './ItemCardInputArea.props';
import cn from 'classnames';


function ItemCardInputArea({ className, children, dark=false}: ItemCardInputAreaProps) {

	return (
		<div className={cn(styles['input-area'], {
			[styles['dark']]: dark,
			[styles['light']]: !dark
		}, className)}>
			{children}             
		</div>		       
	);

}

export default ItemCardInputArea;