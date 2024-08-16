import styles from './FiltersMedia.module.css';
import { FiltersMediaProps } from './FiltersMedia.props';
import cn from 'classnames';
import Modal from 'react-modal';
import overlayStyles from '../../../Modal/ModalStyles/ModalOverlay.module.css';
import CharsFilter from '../../CharsFilter/CharsFilter';

Modal.setAppElement('#root');

function FiltersMedia({maxPrice, minPrice, chars, className, isOpen = false, closeModal}: FiltersMediaProps) {


	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			className={cn(styles['modal-window'], className)}
			overlayClassName={cn(overlayStyles['modal-overlay'])}
			
		>
			<CharsFilter maxPrice={String(maxPrice)} minPrice={String(minPrice)} chars={chars} closeModal={closeModal}/>
		
			
		</Modal>
	);
}

export default FiltersMedia;