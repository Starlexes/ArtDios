import styles from './ModalAskDelete.module.css';
import { ModalAskDeleteProps } from './ModalAskDelete.props';
import cn from 'classnames';
import Modal from 'react-modal';
import overlayStyles from '../../components/Modal/ModalStyles/ModalOverlay.module.css';
import ModelEditButton from '../ModelEditButton/ModelEditButton';

Modal.setAppElement('#root');

function ModalAskDelete({className, isOpen = false, closeModal, message,
	onDelete, idItem, idsItems, onDeleteMulty}: ModalAskDeleteProps) {


	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			className={cn(styles['modal-window'])}
			overlayClassName={cn(overlayStyles['modal-overlay'])}
		>
			
			<div className={cn(styles['modal-content'], className)}>
				<span>
                Вы уверены, что хотите удалить {message}?
				</span>
                
				<div className={cn(styles['modal-buttons'])}>
					<ModelEditButton typeAction='main' onClick={() => {
						if (idItem) {
							onDelete && onDelete(idItem);
							closeModal();
						}	
						if (idsItems) {
							onDeleteMulty && onDeleteMulty(idsItems);
							closeModal();
						}											
					}} className={cn(styles['modal-button'])}>
                        Да
					</ModelEditButton>

					<ModelEditButton typeAction='main' onClick={closeModal} className={cn(styles['modal-button'])}>
                        Нет
					</ModelEditButton>

				</div>
				
			</div>
								
		</Modal>
	);
}

export default ModalAskDelete;