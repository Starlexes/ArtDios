import styles from './ModelEditItems.module.css';
import { ModelEditItemsProps } from './ModelEditItems.props';
import cn from 'classnames';

function ModelEditItems({ className, children }: ModelEditItemsProps) {
	return (
		<div className={cn(styles['edit-items'], className)}>
			{children}
		</div>     
	);
}

export default ModelEditItems;