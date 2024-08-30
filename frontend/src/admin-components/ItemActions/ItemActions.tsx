import ModelEditActions from '../ModelEditActions/ModelEditActions';
import styles from './ItemActions.module.css';
import { ItemActionsProps } from './ItemActions.props';
import cn from 'classnames';


function ItemActions({ className, children }: ItemActionsProps) {

	return (
		
		<ModelEditActions className={cn(styles['item-actions'], className)}>
		
			{children}
		
		</ModelEditActions>
           
	);

}

export default ItemActions;