import MediaCategory from '../../Media/MediaCategory/MediaCategory';
import ModalCatalogContacts from '../ModalCatalogContacts/ModalCatalogContacts';
import ModalLinksMenu from '../ModalLinksMenu/ModalLinksMenu';
import styles from './ModalCatalogBody.module.css';
import { ModalCatalogBodyProps } from './ModalCatalogBody.props';
import cn from 'classnames';


function ModalCatalogBody({onClose, className }: ModalCatalogBodyProps) {

	return (
		<div className={cn(styles['modal-body'], className)}>
			<ModalCatalogContacts/>
			<MediaCategory onClose={onClose}/>
			<ModalLinksMenu/>
		</div>
	);
}

export default ModalCatalogBody;