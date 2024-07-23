import NavItem from '../NavItem/NavItem';
import styles from './NavSocial.module.css';
import { NavSocialProps } from './NavSocial.props';
import cn from 'classnames';

function NavSocial({className}: NavSocialProps) {
	return (
		<div className={cn(styles['messangers__header'], className)}>
			<NavItem href='https://wa.me/+11111111111?text=Здравствуйте' className='social-item'>
				<img src="/social/whatsapp logo.svg" alt="Логотип WhatsApp"/>
			</NavItem>

			<NavItem href='viber://chat?number=+11111111111' className='social-item'>
				<img src="/social/viber logo.svg" alt="Логотип Viber"/>
			</NavItem>

			<NavItem href='https://t.me/+11111111111' className='social-item'>
				<img src="/social/telegram logo.svg" alt="Логотип Telegram"/>
			</NavItem>
			
		</div>
	);
}

export default NavSocial;