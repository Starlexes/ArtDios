
import { useDispatch, useSelector } from 'react-redux';
import MediaButton from '../MediaButton/MediaButton';
import styles from './MediaSearchButton.module.css';
import { MediaSearchButtonProps } from './MediaSearchButton.props';
import cn from 'classnames';
import { setMediaSearchClick } from '../../../slices/buttonSlice';
import { RootState } from '../../../store';
import { renderCross } from '../../../utils/constants';


function MediaSearchButton({className}: MediaSearchButtonProps) {

	const { isClicked } = useSelector((state: RootState) => state.buttons.modalSearchButton);
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch(setMediaSearchClick(!isClicked));
	};

	return (
		<MediaButton onClick={onClick} className={cn(styles['media-search'], className)}>
			{isClicked? renderCross()
				: <img src="media/loupe.svg" alt="Иконка лупы"/> }
			
		</MediaButton>
	);
}

export default MediaSearchButton;