import styles from './ModalTextArea.module.css';
import { ModalTextAreaProps } from './ModalTextArea.props';
import cn from 'classnames';


function ModalTextArea({onChange, name, placeholder, className }: ModalTextAreaProps) {

	return (
		<textarea onChange={onChange} name={name} placeholder={placeholder} className={cn(styles['modal-textarea'], className)} />
	);
}

export default ModalTextArea;