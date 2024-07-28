import Input from '../../Header/Input/Input';


import { ModalInputProps } from './ModalInput.props';


function ModalInput({placeholder, type}: ModalInputProps) {

	return (
		<Input type={type} placeholder={placeholder} className='modal-input'/>
	);
}

export default ModalInput;