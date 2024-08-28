
import AddItemButton from '../AddItemButton/AddItemButton';
import styles from './AddPromoButton.module.css';
import { AddPromoButtonProps } from './AddPromoButton.props';
import cn from 'classnames';



function AddPromoButton({ className, children, ...props}: AddPromoButtonProps) {

	return (
		
		<AddItemButton className={cn(styles['add-promo'], className)} shape='rect' {...props}>
		
			{children}
		
		</AddItemButton>
           
	);

}

export default AddPromoButton;