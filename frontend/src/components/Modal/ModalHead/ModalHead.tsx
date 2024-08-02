import ModalText from '../ModalText/ModalText';
import ModalTitle from '../ModalTitle/ModalTitle';

import styles from './ModalHead.module.css';
import { ModalHeadProps } from './ModalHead.props';
import cn from 'classnames';


function ModalHead({modalTitle, titleClass, modalText, className, textClass }: ModalHeadProps) {

	return (
		<div className={cn(styles['modal-head'], className)}>

			<ModalTitle className={titleClass}>{modalTitle}</ModalTitle>
				
			<ModalText className={textClass}>{modalText}</ModalText>
		</div>
	);
}

export default ModalHead;