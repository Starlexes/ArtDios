import { useState } from 'react';
import Button from '../Header/Button/Button';
import ModalOrderCall from '../Modal/ModalOrderCall/ModalOrderCall';
import { ButtonOrderCallProps } from './ButtonOrderCall.props';
import Modal from 'react-modal';
import ModalThank from '../Modal/ModalThank/ModalThank';
import { useMediaPredicate } from 'react-media-hook';
import MediaButtonOrderCall from '../Media/MediaButtonOrderCall/MediaButtonOrderCall';
import { setMediaSearchClick } from '../../slices/buttonSlice';
import { useDispatch } from 'react-redux';

Modal.setAppElement('#root');


function ButtonOrderCall({className, children}: ButtonOrderCallProps) {

	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

	const dispatch = useDispatch();
	
	const [modalThankIsOpen, setModalThankIsOpen] = useState<boolean>(false);

	const matches = useMediaPredicate('(min-width: 881px)');

	const onClick = () => {
		setModalIsOpen(true);
		dispatch(setMediaSearchClick(false));
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
			{matches? 
				<Button className={className} onClick={onClick}>{children}</Button>
				: <MediaButtonOrderCall onClick={onClick}/>
			}
			<ModalOrderCall isOpen={modalIsOpen} closeModal={closeModal}/>
			<ModalThank isOpen={modalThankIsOpen} closeModal={closeThank}/>
		</>
	);
}

export default ButtonOrderCall;