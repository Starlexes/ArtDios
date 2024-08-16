import styles from './CatalogActions.module.css';
import { CatalogActionsProps } from './CatalogActions.props';
import cn from 'classnames';


function CatalogActions({children, className }: CatalogActionsProps) {

	return (
		<div className={cn(styles['filters-action'], className)}>
		
			{children}
			
		</div>
	);
}

export default CatalogActions;