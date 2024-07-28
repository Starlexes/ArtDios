import ModalText from '../ModalText/ModalText';
import ModalTitle from '../ModalTitle/ModalTitle';

import styles from './ModalHead.module.css';
import { ModalHeadProps } from './ModalHead.props';
import cn from 'classnames';


function ModalHead({modalTitle, modalText, className, textClass }: ModalHeadProps) {

	return (
		<div className={cn(styles['modal-head'], {
			[styles['modal-thank']]: className === 'modal-thank'
		}, className)}>

			<ModalTitle className='thank-title'>{modalTitle}</ModalTitle>
				
			<ModalText className={textClass}>{modalText}</ModalText>
		</div>
	);
}

export default ModalHead;