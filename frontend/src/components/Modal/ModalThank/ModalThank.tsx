import ModalHead from '../ModalHead/ModalHead';
import styles from './ModalThank.module.css';
import { ModalThankProps } from './ModalThank.props';
import overlayStyles from '../ModalStyles/ModalOverlay.module.css';
import cn from 'classnames';
import Modal from 'react-modal';
import ModalCloseButton from '../ModalCloseButton/ModalCloseButton';


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
					titleClass='thank-title'
					className={cn(styles['head-thank'])}
				/>
                
				
			</div>

			<img src="/other/smile.png" alt="Smile" />

			<ModalCloseButton className={cn(styles['close-thank'])} onClick={() => closeModal(false)}/>
		</Modal>
		
	);
}

export default ModalThank;