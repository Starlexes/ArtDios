import NavItem from '../../Header/NavItem/NavItem';
import FooterSocialItem from '../FooterSocialItem/FooterSocialItem';
import MenuFooterItem from '../MenuFooterItem/MenuFooterItem';
import MenuTitle from '../MenuTitle/MenuTitle';
import styles from './MenuFooter.module.css';
import { MenuFooterProps } from './MenuFooter.props';
import cn from 'classnames';
import { RootState } from '../../../store';
import { useSelector} from 'react-redux';

function MenuFooter({className, ...props }: MenuFooterProps) {

	const phones = useSelector((state: RootState) => state.contacts.phones);
	const emails = useSelector((state: RootState) => state.contacts.emails);

	return (
		<div className={cn(styles['menu-footer'], className)} {...props}>
			<MenuFooterItem>
				<MenuTitle>Категории</MenuTitle>
				<NavItem href='#' className='contact-text'>Межкомнатные двери</NavItem>
				<NavItem href='#' className='contact-text'>Входные двери</NavItem>
				<NavItem href='#' className='contact-text'>Натяжные потолки</NavItem>
				<NavItem href='#' className='contact-text'>Напольные покрытия</NavItem>
			</MenuFooterItem>
            
			<MenuFooterItem>
				<MenuTitle>Информация</MenuTitle>
				<NavItem href='#' className='contact-text'>Доставка и оплата</NavItem>
				<NavItem href='#' className='contact-text'>Возврат товара</NavItem>
				<NavItem href='#' className='contact-text'>Установка</NavItem>
				
			</MenuFooterItem>

			<MenuFooterItem>
				<MenuTitle>Социальные сети</MenuTitle>
				<NavItem href='https://wa.me/+11111111111?text=Здравствуйте' className='contact-text'>
					<FooterSocialItem>
						<img src="/social/whatsapp logo.svg" alt="Логотип WhatsApp"/>   
                        WhatsApp
					</FooterSocialItem>
				</NavItem>
				<NavItem href='viber://chat?number=+11111111111' className='contact-text'>
					<FooterSocialItem>
						<img src="/social/viber logo.svg" alt="Логотип Viber"/>   
                        Viber
					</FooterSocialItem>
				</NavItem>
				<NavItem href='https://t.me/+11111111111' className='contact-text'>
					<FooterSocialItem>
						<img src="/social/telegram logo.svg" alt="Логотип Telegram"/>   
                        Telegram
					</FooterSocialItem>
				</NavItem>
					
			</MenuFooterItem>

			<MenuFooterItem>
				<MenuTitle>Контакты</MenuTitle>
				{phones.map(item => (
					<NavItem className='contact-text' href={`tel:${item}`}>
						{item}
					</NavItem>
				))}

				{emails.map(item => (
					<NavItem className='contact-text' href={`mailto:${item}`}>
						{item}
					</NavItem>
				))}

			</MenuFooterItem>
		</div>
	);
}

export default MenuFooter;