
import Button from '../../Header/Button/Button';
import ModalHead from '../ModalHead/ModalHead';
import styles from './ModalThank.module.css';
import { ModalThankProps } from './ModalThank.props';
import cn from 'classnames';
import Modal from 'react-modal';


Modal.setAppElement('#root');

function ModalThank({isOpen = false, closeModal, className}: ModalThankProps) {

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
			top: '30%',
			left: '50%',
			borderRadius: '10px 10px 40px 10px',
			width: 'calc(510 / 1200 * 100vw)',
			maxWidth: '510px',
			minHeight: '188px',
			position: 'relative',
			display: 'flex',
			paddingBottom: '54px',
			paddingTop: '45px'
		} as React.CSSProperties
	} ;

	return (
		
		<Modal
			isOpen={isOpen}
			onRequestClose={() => closeModal(false)}
			className={cn(className)}
			style={modalStyles}
		>
			<div className={cn(styles['modal-content'])}>
				<ModalHead 
					modalTitle='Спасибо за обращение!'
					modalText='Ваша заявка принята.'
					textClass='modal-thank'
					className='modal-thank'
				/>

				<Button className='close-thank' onClick={() => closeModal(false)}>
					<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="18.9844" width="2.68518" height="26.8518" rx="1.34259" transform="rotate(45 18.9844 0)" fill="#CFCFCF"/>
						<rect y="1.89844" width="2.68518" height="26.8518" rx="1.34259" transform="rotate(-45 0 1.89844)" fill="#CFCFCF"/>
					</svg>
				</Button>
                
				<img src="/other/smile.png" alt="Smile" />

			</div>
		</Modal>
		
	);
}

export default ModalThank;