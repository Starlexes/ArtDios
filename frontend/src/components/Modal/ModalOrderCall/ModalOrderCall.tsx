import { FormEvent, useState } from 'react';

import ModalForm from '../ModalForm/ModalForm';
import ModalHead from '../ModalHead/ModalHead';
import styles from './ModalOrderCall.module.css';
import overlayStyles from '../ModalStyles/ModalOverlay.module.css';
import { ModalOrderCallProps } from './ModalOrderCall.props';
import cn from 'classnames';
import Modal from 'react-modal';
import ModalCloseButton from '../ModalCloseButton/ModalCloseButton';

Modal.setAppElement('#root');

export interface ErrorData {
	name?: string,
	tel?: string,
	agreement?: boolean
}

function ModalOrderCall({isOpen = false, closeModal, commentPlaceholder}: ModalOrderCallProps) {

	const [errors, setErrors] = useState<ErrorData>({});

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		closeModal(true);
		setErrors({});
	};

	const onClickClose = () => {
		closeModal(false);
		setErrors({});
	};

	
	return (
		
		<Modal
			isOpen={isOpen}
			onRequestClose={onClickClose}
			className={cn(styles['modal-window'], {
				[styles['modal-errors']]: Object.keys(errors).length !== 0
			})}
			overlayClassName={cn(overlayStyles['modal-overlay'])}
		>
			<div className={cn(styles['modal-content'])}>
				<ModalHead 
					modalTitle='Обратная связь'
					modalText='Укажите ваши контактные данные'
					textClass='modal-text'					
				/>

				<ModalForm onClickClose={onClickClose} onSubmit={onSubmit}
					errors={errors} setErrors={setErrors} commentPlaceholder={commentPlaceholder}/>
			</div>
			<ModalCloseButton onClick={onClickClose} className={styles['modal-order']}/>
		</Modal>
		
	);
}

export default ModalOrderCall;