import { useState } from 'react';
import Button from '../Header/Button/Button';
import ModalOrderCall from '../Modal/ModalOrderCall/ModalOrderCall';
import { ButtonOrderCallProps } from './ButtonOrderCall.props';
import Modal from 'react-modal';
import ModalThank from '../Modal/ModalThank/ModalThank';
import { useMediaPredicate } from 'react-media-hook';
import MediaButtonOrderCall from '../Media/MediaButtonOrderCall/MediaButtonOrderCall';
import { setMediaSearchClick} from '../../slices/buttonSlice';
import { useDispatch } from 'react-redux';


Modal.setAppElement('#root');


function ButtonOrderCall({isProduct=false, className, children,
	onClickProductOrder, commentPlaceholder}: ButtonOrderCallProps) {

	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

	const dispatch = useDispatch();
	
	const [modalThankIsOpen, setModalThankIsOpen] = useState<boolean>(false);

	const matches = useMediaPredicate('(min-width: 881px)');

	const onClick = () => {
		isProduct && onClickProductOrder && onClickProductOrder();
		setModalIsOpen(true);
		dispatch(setMediaSearchClick(false));
		
	};


	const closeModal = (isSubmit = false) => {
		!isSubmit && isProduct && onClickProductOrder && onClickProductOrder();
		setModalIsOpen(false);
		if (isSubmit) {	
			setModalThankIsOpen(true);
		}
		
	};

	const closeThank = () => {
		isProduct && onClickProductOrder && onClickProductOrder();
		setModalThankIsOpen(false);
	};

	return (
		<>
			{matches || isProduct? 
				<Button className={className} onClick={onClick} isProduct={isProduct}>{children}</Button>
				: <MediaButtonOrderCall onClick={onClick}/>
			}
			<ModalOrderCall isOpen={modalIsOpen} closeModal={closeModal} commentPlaceholder={commentPlaceholder}/>
			<ModalThank isOpen={modalThankIsOpen} closeModal={closeThank}/>
		</>
	);
}

export default ButtonOrderCall;