import styles from './ModalTitle.module.css';
import { ModalTitleProps } from './ModalTitle.props';
import cn from 'classnames';


function ModalTitle({children, className }: ModalTitleProps) {

	return (
		<h2 className={cn(styles['modal-title'], {
			[styles['thank-title']]: className === 'thank-title'
		}, className)}>{children}</h2>
	);
}

export default ModalTitle;