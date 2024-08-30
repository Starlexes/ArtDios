
import ItemActionButton from '../ItemActionButton/ItemActionButton';
import styles from './SaveDeleteButton.module.css';
import { SaveDeleteButtonProps } from './SaveDeleteButton.props';
import cn from 'classnames';



function SaveDeleteButton({ className, typeAction, ...props}: SaveDeleteButtonProps) {

	return (
		
		<ItemActionButton className={cn(styles['edit-btn'], {
	
		}, className)} roleAction={typeAction} {...props}>
		
			{
				typeAction === 'accept'? 'Сохранить': 'Удалить'
			}
		
		</ItemActionButton>
           
	);

}

export default SaveDeleteButton;