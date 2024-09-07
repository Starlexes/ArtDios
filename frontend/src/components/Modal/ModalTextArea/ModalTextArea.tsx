import styles from './ModalTextArea.module.css';
import { ModalTextAreaProps } from './ModalTextArea.props';
import cn from 'classnames';


function ModalTextArea({onChange, name, placeholder, className, ...props }: ModalTextAreaProps) {

	return (
		<textarea onChange={onChange} name={name} placeholder={placeholder}
			className={cn(styles['modal-textarea'], className)} {...props}/>
	);
}

export default ModalTextArea;