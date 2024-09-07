import styles from './ItemCardInputLabel.module.css';
import { ItemCardInputLabelProps } from './ItemCardInputLabel.props';
import cn from 'classnames';


function ItemCardInputLabel({ className, children, dark=true}: ItemCardInputLabelProps) {

	return (		
		<label htmlFor='item-property' className={cn(styles['input-title'], {
			[styles['light']]: !dark
		}, className)}>		
			{children}		
		</label>        
	);

}

export default ItemCardInputLabel;