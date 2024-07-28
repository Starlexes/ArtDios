import Input from '../../Header/Input/Input';


import { ModalInputProps } from './ModalInput.props';


function ModalInput({hasError=false, name, onInput, onChange, placeholder, type}: ModalInputProps) {

	return (
		<Input hasError={hasError} onInput={onInput} name={name} onChange={onChange} type={type} placeholder={placeholder} className='modal-input'/>
	);
}

export default ModalInput;