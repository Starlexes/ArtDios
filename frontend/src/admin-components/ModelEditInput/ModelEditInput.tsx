
import Input from '../../components/Header/Input/Input';
import styles from './ModelEditInput.module.css';
import { ModelEditInputProps } from './ModelEditInput.props';
import cn from 'classnames';


function ModelEditInput({ className, placeholder, type, ...props}: ModelEditInputProps) {

	return (
		
		<Input className={cn(styles['edit-input'], className)}
			type={type? type: 'text'} {...props} placeholder={placeholder? placeholder: 'Название...'}/>

	);

}

export default ModelEditInput;