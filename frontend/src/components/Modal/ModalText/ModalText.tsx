import styles from './ModalText.module.css';
import { ModalTextProps } from './ModalText.props';
import cn from 'classnames';


function ModalText({children, className }: ModalTextProps) {

	return (
		<span className={cn({
			[styles['modal-text']]: className === 'modal-text',
			[styles['modal-thank']]: className === 'modal-thank'
		}, className)}>{children}</span>
	);
}

export default ModalText;