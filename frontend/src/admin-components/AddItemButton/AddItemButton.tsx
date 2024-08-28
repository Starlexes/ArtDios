
import Button from '../../components/Header/Button/Button';
import styles from './AddItemButton.module.css';
import { AddItemButtonProps } from './AddItemButton.props';
import cn from 'classnames';



function AddItemButton({ className, children, shape, ...props}: AddItemButtonProps) {

	return (
		
		<Button className={cn(styles['add-btn'], {
			[styles['rect']]: shape === 'rect',
			[styles['circle']]: shape === 'circle'
		}, className)} {...props}>
		
			{children}
		
		</Button>
           
	);

}

export default AddItemButton;