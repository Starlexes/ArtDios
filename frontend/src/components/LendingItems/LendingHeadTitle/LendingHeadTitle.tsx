import styles from './LendingHeadTitle.module.css';
import { LendingHeadTitleProps } from './LendingHeadTitle.props';
import cn from 'classnames';

function LendingHeadTitle({children, className }: LendingHeadTitleProps) {
	
	return (	
		<h2 className={cn(styles['lending-title'], className)}>{children}</h2>
	);

}

export default LendingHeadTitle;