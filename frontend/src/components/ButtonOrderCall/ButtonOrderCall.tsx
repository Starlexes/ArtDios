import { useState } from 'react';
import Button from '../Header/Button/Button';
import ModalOrderCall from '../Modal/ModalOrderCall/ModalOrderCall';
import { ButtonOrderCallProps } from './ButtonOrderCall.props';
import Modal from 'react-modal';

Modal.setAppElement('#root');


function ButtonOrderCall({className, children}: ButtonOrderCallProps) {

	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	

	const onClick = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	return (
		<>
			<Button className={className} onClick={onClick}>{children}</Button>
			<ModalOrderCall isOpen={modalIsOpen} closeModal={closeModal}/>
		</>
	);
}

export default ButtonOrderCall;