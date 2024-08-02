
import Button from '../../Header/Button/Button';
import ModalHead from '../ModalHead/ModalHead';
import styles from './ModalThank.module.css';
import { ModalThankProps } from './ModalThank.props';
import overlayStyles from '../ModalStyles/ModalOverlay.module.css';
import cn from 'classnames';
import Modal from 'react-modal';


Modal.setAppElement('#root');

function ModalThank({isOpen = false, closeModal}: ModalThankProps) {

	
	return (
		
		<Modal
			isOpen={isOpen}
			onRequestClose={() => closeModal(false)}
			className={cn(styles['modal-window'])}
			overlayClassName={cn(overlayStyles['modal-overlay'])}
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