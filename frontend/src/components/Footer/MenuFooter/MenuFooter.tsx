import NavItem from '../../Header/NavItem/NavItem';
import FooterSocialItem from '../FooterSocialItem/FooterSocialItem';
import MenuFooterItem from '../MenuFooterItem/MenuFooterItem';
import MenuTitle from '../MenuTitle/MenuTitle';
import styles from './MenuFooter.module.css';
import { MenuFooterProps } from './MenuFooter.props';
import cn from 'classnames';
import { RootState } from '../../../store';
import { useSelector} from 'react-redux';
import { useMemo } from 'react';
import { useAppSelector } from '../../../hooks';
import AnchorNavItem from '../../AnchorNavItem/AnchorNavItem';

function MenuFooter({className, ...props }: MenuFooterProps) {

	const phones = useSelector((state: RootState) => state.contacts.phones);
	const emails = useSelector((state: RootState) => state.contacts.emails);

	const categories = useAppSelector((state: RootState) => state.categories);

	const memoizedPhones = useMemo(() => phones.slice(), [phones]);
	const memoizedEmails = useMemo(() => emails.slice(), [emails]);

	return (
		<div className={cn(styles['menu-footer'], className)} {...props}>
			<MenuFooterItem>
				<MenuTitle>Категории</MenuTitle>
				{
					categories.map((item) => (
						<NavItem to={item.slug} key={item.name} className={cn(styles['category'])}>{item.name}</NavItem>
					)
						
					)
				}
			</MenuFooterItem>

			<MenuFooterItem>
				<MenuTitle>Информация</MenuTitle>
				<NavItem to='/' className='contact-text'>Доставка и оплата</NavItem>
				<NavItem to='/' className='contact-text'>Возврат товара</NavItem>
				<NavItem to='/' className='contact-text'>Установка</NavItem>
			</MenuFooterItem>

			<MenuFooterItem>
				<MenuTitle>Социальные сети</MenuTitle>
				<AnchorNavItem href='https://wa.me/+11111111111?text=Здравствуйте' className={cn(styles['contact-text'])}>
					<FooterSocialItem>
						<img src="/social/whatsapp logo.svg" alt="Логотип WhatsApp"/>   
                        WhatsApp
					</FooterSocialItem>
				</AnchorNavItem>
				<AnchorNavItem href='viber://chat?number=+11111111111' className={cn(styles['contact-text'])}>
					<FooterSocialItem>
						<img src="/social/viber logo.svg" alt="Логотип Viber"/>   
                        Viber
					</FooterSocialItem>
				</AnchorNavItem>

				<AnchorNavItem href='https://t.me/+11111111111' className={cn(styles['contact-text'])}>
					<FooterSocialItem>
						<img src="/social/telegram logo.svg" alt="Логотип Telegram"/>   
                        Telegram
					</FooterSocialItem>
				</AnchorNavItem>
					
			</MenuFooterItem>

			<MenuFooterItem>
				<MenuTitle>Контакты</MenuTitle>
				{memoizedPhones.map(item => (
					<AnchorNavItem className={cn(styles['contact-text'])} href={`tel:${item}`} key={item}>
						{item}
					</AnchorNavItem>
				))}

				{memoizedEmails.map(item => (
					<AnchorNavItem className={cn(styles['contact-text'])} href={`mailto:${item}`} key={item}>
						{item}
					</AnchorNavItem>
				))}
			</MenuFooterItem>
		</div>
	);
}

export default MenuFooter;