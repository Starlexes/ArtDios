
import styles from './ServiceItem.module.css';
import { ServiceItemProps } from './ServiceItem.props';
import cn from 'classnames';


function ServiceItem({className, children }: ServiceItemProps) {

	
	return (
		
		<div className={cn(styles['service-item'], className)}>
			{children}
				
		</div>	
	);

}

export default ServiceItem;