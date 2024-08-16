

import styles from './PropertyTitle.module.css';
import { PropertyTitleProps } from './PropertyTitle.props';
import cn from 'classnames';

function PropertyTitle({children, className }: PropertyTitleProps) {

	return (
		<label>
			<span className={cn(styles['property-title'], className)}>{children}</span>	
		</label>
	);
}

export default PropertyTitle;