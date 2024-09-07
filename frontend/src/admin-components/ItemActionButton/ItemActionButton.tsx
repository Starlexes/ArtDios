
import Button from '../../components/Header/Button/Button';
import styles from './ItemActionButton.module.css';
import { ItemActionButtonProps } from './ItemActionButton.props';
import cn from 'classnames';


function ItemActionButton({ className, children, roleAction, ...props}: ItemActionButtonProps) {

	return (
		
		<Button className={cn(styles['action-btn'], {
			[styles['accept']]: roleAction === 'accept',
			[styles['delete']]: roleAction === 'delete',
			[styles['static']]: roleAction === 'static'


		}, className)} {...props}>
		
			{children}
		
		</Button>
           
	);

}

export default ItemActionButton;