import MediaButton from '../MediaButton/MediaButton';
import styles from './MediaBurger.module.css';
import { MediaBurgerProps } from './MediaBurger.props';

import cn from 'classnames';
import ModalCatalog from '../../Modal/ModalCatalog/ModalCatalog';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setMediaBurgerClick } from '../../../slices/buttonSlice';
import { useEffect, useState } from 'react';


function MediaBurger({className}: MediaBurgerProps) {

	const isClicked = useSelector((state: RootState) => state.buttons.modalBurgerButton.isClicked);
	
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const dispatch = useDispatch();

	const [contentVisible, setContentVisible] = useState<boolean>(false);

	useEffect(() => {
		
		if (isOpen) {
			const timer = setTimeout(() => {
				setContentVisible(true);
			}, 100);
			return () => clearTimeout(timer);
		} else {
			setContentVisible(false);
		}

	}, [isOpen]);


	const onClick = () => {
		dispatch(setMediaBurgerClick(!isClicked));
		
	};

	const closeModal = () => {
		dispatch(setMediaBurgerClick(false));
		setIsOpen(false);
	};

	useEffect( () => {
		if (isClicked) {
			setIsOpen(true);
		}
	}, [isClicked, dispatch]);
	

	return (
		<>
			<MediaButton onClick={onClick} className={cn(styles['media-burger'], className)}>
				<img src="media/burger.svg" alt="Бургер-меню" />
			</MediaButton>

			<ModalCatalog isOpen={isOpen} closeModal={closeModal} contentVisible={contentVisible}/>
		</>
	);
}

export default MediaBurger;