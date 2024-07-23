
import styles from './NavigationListItem.module.css';
import { NavigationListItemProps } from './NavigationListItem.props';
import cn from 'classnames';

function NavigationListItem({children, className, ...props}: NavigationListItemProps) {
	return (
		<li className={cn(styles['list__header'], className)} {...props}>
			{children}
		</li>
	);
}

export default NavigationListItem;