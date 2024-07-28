import { useState } from 'react';
import Button from '../Header/Button/Button';
import ModalOrderCall from '../Modal/ModalOrderCall/ModalOrderCall';
import { ButtonOrderCallProps } from './ButtonOrderCall.props';
import Modal from 'react-modal';
import ModalThank from '../Modal/ModalThank/ModalThank';

Modal.setAppElement('#root');


function ButtonOrderCall({className, children}: ButtonOrderCallProps) {

	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	
	const [modalThankIsOpen, setModalThankIsOpen] = useState<boolean>(false);

	const onClick = () => {
		setModalIsOpen(true);
		
	};


	const closeModal = (isSubmit: boolean = false) => {
		if (isSubmit) {
			setModalIsOpen(false);
			setModalThankIsOpen(true);
			
		} else {
			setModalIsOpen(false);
		}
	
	};

	const closeThank = () => {
		setModalThankIsOpen(false);
	};

	return (
		<>
			<Button className={className} onClick={onClick}>{children}</Button>
			<ModalOrderCall isOpen={modalIsOpen} closeModal={closeModal}/>
			<ModalThank isOpen={modalThankIsOpen} closeModal={closeThank}/>
		</>
	);
}

export default ButtonOrderCall;