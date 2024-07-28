import ModalText from '../ModalText/ModalText';
import ModalTitle from '../ModalTitle/ModalTitle';

import styles from './ModalHead.module.css';
import { ModalHeadProps } from './ModalHead.props';
import cn from 'classnames';


function ModalHead({ className }: ModalHeadProps) {

	return (
		<div className={cn(styles['modal-head'], className)}>

        
			<ModalTitle>Обратная связь</ModalTitle>
				
			<ModalText>Укажите ваши контактные данные и мы свяжемся с вами</ModalText>
		</div>
	);
}

export default ModalHead;