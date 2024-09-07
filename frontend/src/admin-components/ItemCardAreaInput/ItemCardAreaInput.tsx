import styles from './ItemCardAreaInput.module.css';
import { ItemCardAreaInputProps } from './ItemCardAreaInput.props';
import cn from 'classnames';


function ItemCardAreaInput({ className, children, errors, dark=true, ...props}: ItemCardAreaInputProps) {

	return (

		<textarea name='item-property' className={cn(styles['card-input'], {
			[styles['errors']]: errors,
			[styles['light']]: !dark
		}, className)} {...props}>
		
			{children}
		
		</textarea>
	
	);

}

export default ItemCardAreaInput;