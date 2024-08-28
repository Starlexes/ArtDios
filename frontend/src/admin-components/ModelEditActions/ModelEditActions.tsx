import styles from './ModelEditActions.module.css';
import { ModelEditActionsProps } from './ModelEditActions.props';
import cn from 'classnames';


function ModelEditActions({ className, children }: ModelEditActionsProps) {

	return (
		
		<div className={cn(styles['model-actions'], className)}>
		
			{children}
		
		</div>
           
	);

}

export default ModelEditActions;