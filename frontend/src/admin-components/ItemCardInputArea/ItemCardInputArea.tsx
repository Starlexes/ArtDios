import styles from './ItemCardInputArea.module.css';
import { ItemCardInputAreaProps } from './ItemCardInputArea.props';
import cn from 'classnames';


function ItemCardInputArea({ className, children}: ItemCardInputAreaProps) {

	return (
		<div className={cn(styles['input-area'], className)}>
			{children}             
		</div>		       
	);

}

export default ItemCardInputArea;