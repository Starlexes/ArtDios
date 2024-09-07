import Input from '../../components/Header/Input/Input';
import styles from './ItemCardInput.module.css';
import { ItemCardInputProps } from './ItemCardInput.props';
import cn from 'classnames';


function ItemCardInput({ className, children, errors, dark=true, ...props}: ItemCardInputProps) {

	return (

		<Input name='item-property' className={cn(styles['card-input'], {
			[styles['errors']]: errors,
			[styles['light']]: !dark
		}, className)} {...props}>
		
			{children}
		
		</Input>
	
	);

}

export default ItemCardInput;