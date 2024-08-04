import styles from './ModalCatalog.module.css';
import { ModalCatalogProps } from './ModalCatalog.props';
import cn from 'classnames';
import Modal from 'react-modal';
import overlayStyles from '../ModalStyles/ModalOverlay.module.css';
import ModalCatalogHead from '../ModalCatalogHead/ModalCatalogHead';
import ModalCatalogBody from '../ModalCatalogBody/ModalCatalogBody';

Modal.setAppElement('#root');

function ModalCatalog({className, isOpen = false, closeModal, contentVisible }: ModalCatalogProps) {


	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			className={cn(styles['modal-window'], {
				[styles['active']]: contentVisible
			})}
			overlayClassName={cn(overlayStyles['modal-overlay'], overlayStyles['overlay-catalog'])}
		>
			{
				contentVisible && <div className={cn(styles['modal-content'], className)}>
					<ModalCatalogHead onClose={closeModal}/>
					<ModalCatalogBody onClose={closeModal}/>
				</div>
			}
		
			
		</Modal>
	);
}

export default ModalCatalog;