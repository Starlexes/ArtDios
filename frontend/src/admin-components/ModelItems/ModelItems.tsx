import styles from './ModelItems.module.css';
import { ModelItemsProps } from './ModelItems.props';
import cn from 'classnames';



function ModelItems({ className, children }: ModelItemsProps) {
	
	return (		
		<div className={cn(styles['model-items'], className)}>
			{children}
		</div>           
	);

}

export default ModelItems;