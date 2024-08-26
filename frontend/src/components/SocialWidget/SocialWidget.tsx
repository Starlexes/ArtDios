import styles from './SocialWidget.module.css';
import cn from 'classnames';
import { SocialWidgetProps } from './SocialWidget.props';
import NavSocial from '../Header/NavSocial/NavSocial';
import { useState } from 'react';
import { mediaImagesPath } from '../../utils/constants';


function SocialWidget({ className }: SocialWidgetProps) {

	const [isOpenSocial, setIsOpenSocial] = useState<boolean>(false);
	const [showDown, setShowDown] = useState<boolean>(false);

	const onClick = () => {
	
		setShowDown(isOpenSocial);
		
		setIsOpenSocial(!isOpenSocial);
		setTimeout(() => setShowDown(false), 500);
	};

	return (	
		<div className={cn(styles['social-widget'], className)}>
			<NavSocial className={cn(styles['social-items'])}
				anchorClassName={cn(styles['social-item'], {
					[styles['open-item']]: isOpenSocial,
					[styles['close-item']]: showDown
				})}/>
			<div className={cn(styles['widget-icon'], {
				[styles['open-widget']]: isOpenSocial
			})} onClick={onClick}>
				<img src={mediaImagesPath+'/media/phone.svg'} alt="Иконка телефона" />
			</div>
			
		</div>
	);
}

export default SocialWidget;