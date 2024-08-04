import { renderCross } from '../../../utils/constants';
import ModalCloseButton from '../ModalCloseButton/ModalCloseButton';
import styles from './ModalCatalogHead.module.css';
import { ModalCatalogHeadProps } from './ModalCatalogHead.props';
import cn from 'classnames';


function ModalCatalogHead({onClose, className }: ModalCatalogHeadProps) {

	return (
		<div className={cn(styles['modal-head'], className)}>
			<img className={cn(styles['modal-logo'])} src="/artdios-logo.png" alt="АРТДИОС logo"/>

			<ModalCloseButton onClick={onClose}>
				{renderCross()}
			</ModalCloseButton>
		</div>
	);
}

export default ModalCatalogHead;