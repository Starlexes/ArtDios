import { SpinnerProps } from './Spinner.props';
import styles from './Spinner.module.css';
import cn from 'classnames';

function Spinner({className}: SpinnerProps) {
	return (
		<div className={cn(styles['loader'], className)}></div>
	);
}

export default Spinner;