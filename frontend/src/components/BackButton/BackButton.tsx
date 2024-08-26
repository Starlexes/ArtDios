import { useNavigate } from 'react-router-dom';
import Button from '../Header/Button/Button';
import styles from './BackButton.module.css';
import { BackButtonProps } from './BackButton.props';
import cn from 'classnames';
import { useMediaPredicate } from 'react-media-hook';
import { mediaImagesPath } from '../../utils/constants';

function BackButton({ className, btnClassName, onClickBack}: BackButtonProps) {

	const navigate = useNavigate();
	
	const onClick = () => {
		onClickBack && onClickBack();
		navigate(-1);
	};

	const matches = useMediaPredicate('(min-width: 511px)');

	return (
		
		<Button onClick={onClick} className={cn(styles['back-btn'], btnClassName)}>
			<div className={cn(styles['back-content'], className)}>
				{
					matches?
						<>
							<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<rect y="5.65625" width="8" height="1" rx="0.5" transform="rotate(-45 0 5.65625)" fill="#999999" />
								<rect x="0.710938" y="5.09375" width="8" height="1" rx="0.5" transform="rotate(45 0.710938 5.09375)" fill="#999999" />
							</svg>
                Назад
						</>
				
						: 
						<img src= {mediaImagesPath+'/media/mobile back.svg'} alt="Назад"/>
					
				}
			</div>
		</Button>
	);
}

export default BackButton;