import { FormEvent } from 'react';
import Button from '../../Header/Button/Button';
import ModalForm from '../ModalForm/ModalForm';
import ModalHead from '../ModalHead/ModalHead';
import styles from './ModalOrderCall.module.css';
import { ModalOrderCallProps } from './ModalOrderCall.props';
import cn from 'classnames';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function ModalOrderCall({isOpen = false, closeModal, className}: ModalOrderCallProps) {


	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log('Submit');
	};


	const modalStyles = {
		overlay: {
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'rgba(21, 21, 21, 0.79)'
			
		},
		content: {
			transform: 'translateX(-50%)',
			left: '50%',
			borderRadius: '40px',
			width: 'calc(484 / 1200 * 100vw)',
			maxWidth: '484px',
			minHeight: '804px',
			position: 'relative',
			display: 'flex',
			justifyContent: 'center',
			paddingTop: '49px'
		} as React.CSSProperties
	} ;

	return (
		
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			className={cn(className)}
			style={modalStyles}
		>
			<div className={cn(styles['modal-content'])}>
				<ModalHead/>

				<Button className='close-modal' onClick={closeModal}>
					<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="18.9844" width="2.68518" height="26.8518" rx="1.34259" transform="rotate(45 18.9844 0)" fill="#CFCFCF"/>
						<rect y="1.89844" width="2.68518" height="26.8518" rx="1.34259" transform="rotate(-45 0 1.89844)" fill="#CFCFCF"/>
					</svg>
				</Button>

				<ModalForm onSubmit={handleSubmit}/>
				
			</div>
		</Modal>
		
	);
}

export default ModalOrderCall;