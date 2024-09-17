import { mediaImagesPath } from '../../../utils/constants';
import AnchorNavItem from '../../AnchorNavItem/AnchorNavItem';
import styles from './NavSocial.module.css';
import { NavSocialProps } from './NavSocial.props';
import cn from 'classnames';

function NavSocial({className, anchorClassName}: NavSocialProps) {
	return (
		<div className={cn(styles['messangers__header'], className)}>
			<AnchorNavItem href='https://wa.me/+79782111387?text=Здравствуйте' className={cn(styles['social-item'], anchorClassName)} target='blank'>
				<img src={mediaImagesPath+'/social/whatsapp logo.svg'} alt="Логотип WhatsApp"/>
			</AnchorNavItem>

			<AnchorNavItem href='viber://chat?number=+79782111387' className={cn(styles['social-item'], anchorClassName)} target='blank'>
				<img src={mediaImagesPath+'/social/viber logo.svg'} alt="Логотип Viber"/>
			</AnchorNavItem>

			<AnchorNavItem href='https://t.me/+79782111387' className={cn(styles['social-item'], anchorClassName)} target='blank'>
				<img src={mediaImagesPath+'/social/telegram logo.svg'} alt="Логотип Telegram"/>
			</AnchorNavItem>
			
		</div>
	);
}

export default NavSocial;