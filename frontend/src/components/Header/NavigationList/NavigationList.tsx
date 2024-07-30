

import styles from './NavigationList.module.css';
import { NavigationListProps } from './NavigationList.props';
import cn from 'classnames';

function NavigationList({children, className, onMouseEnter}: NavigationListProps) {
	return (
		
		<nav>
			<ul>
				<div className={cn(styles['contacts__header'], className)} onMouseEnter={onMouseEnter}>				
					{children}			
				</div>
			</ul>
		</nav>
	);
}

export default NavigationList;