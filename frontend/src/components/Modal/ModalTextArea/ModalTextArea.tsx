import styles from './ModalTextArea.module.css';
import { ModalTextAreaProps } from './ModalTextArea.props';
import cn from 'classnames';


function ModalTextArea({placeholder, className }: ModalTextAreaProps) {

	return (
		<textarea placeholder={placeholder} className={cn(styles['modal-textarea'], className)} />
	);
}

export default ModalTextArea;