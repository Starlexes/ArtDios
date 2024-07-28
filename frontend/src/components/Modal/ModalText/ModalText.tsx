import styles from './ModalText.module.css';
import { ModalTextProps } from './ModalText.props';
import cn from 'classnames';


function ModalText({children, className }: ModalTextProps) {

	return (
		<span className={cn(styles['modal-text'], className)}>{children}</span>
	);
}

export default ModalText;