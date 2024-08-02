import { FormEvent, useState } from 'react';
import Button from '../../Header/Button/Button';
import ModalForm from '../ModalForm/ModalForm';
import ModalHead from '../ModalHead/ModalHead';
import styles from './ModalOrderCall.module.css';
import overlayStyles from '../ModalStyles/ModalOverlay.module.css';
import { ModalOrderCallProps } from './ModalOrderCall.props';
import cn from 'classnames';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export interface ErrorData {
	name?: string,
	tel?: string,
	agreement?: boolean
}

function ModalOrderCall({isOpen = false, closeModal}: ModalOrderCallProps) {

	const [errors, setErrors] = useState<ErrorData>({});

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		closeModal(true);
		setErrors({});
	};

	
	return (
		
		<Modal
			isOpen={isOpen}
			onRequestClose={() => {
				closeModal(false);
				setErrors({});
			}}
			className={cn(styles['modal-window'], {
				[styles['modal-errors']]: Object.keys(errors).length !== 0
			})}
			overlayClassName={cn(overlayStyles['modal-overlay'])}
		>
			<div className={cn(styles['modal-content'])}>
				<ModalHead 
					modalTitle='Обратная связь'
					modalText='Укажите ваши контактные данные и мы свяжемся с вами'
					textClass='modal-text'					
				/>

				<ModalForm onSubmit={onSubmit} errors={errors} setErrors={setErrors}/>
			</div>
			<Button className={cn(styles['close-modal'])} onClick={() => {
				closeModal(false);
				setErrors({});
			}}>
				<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="18.9844" width="2.68518" height="26.8518" rx="1.34259" transform="rotate(45 18.9844 0)" fill="#CFCFCF"/>
					<rect y="1.89844" width="2.68518" height="26.8518" rx="1.34259" transform="rotate(-45 0 1.89844)" fill="#CFCFCF"/>
				</svg>
			</Button>
		</Modal>
		
	);
}

export default ModalOrderCall;