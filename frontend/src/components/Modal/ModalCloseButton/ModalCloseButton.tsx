import Button from '../../Header/Button/Button';
import styles from './ModalCloseButton.module.css';
import { ModalCloseButtonProps } from './ModalCloseButton.props';
import cn from 'classnames';


function ModalCloseButton({onClick, className }: ModalCloseButtonProps) {

	return (
		<Button className={cn(styles['close-modal'], className)} onClick={onClick}>
			<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="18.9844" width="2.68518" height="26.8518" rx="1.34259" transform="rotate(45 18.9844 0)" fill="#CFCFCF"/>
				<rect y="1.89844" width="2.68518" height="26.8518" rx="1.34259" transform="rotate(-45 0 1.89844)" fill="#CFCFCF"/>
			</svg>
		</Button>
	);
}

export default ModalCloseButton;