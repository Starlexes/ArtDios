import styles from './CardEditItemActions.module.css';
import { CardEditItemActionsProps } from './CardEditItemActions.props';
import cn from 'classnames';


function CardEditItemActions({ className, children }: CardEditItemActionsProps) {

	return (
		
		<div className={cn(styles['item-actions'], className)}>
		
			{children}
		
		</div>
           
	);

}

export default CardEditItemActions;