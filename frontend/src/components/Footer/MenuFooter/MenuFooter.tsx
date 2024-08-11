import NavItem from '../../Header/NavItem/NavItem';
import FooterSocialItem from '../FooterSocialItem/FooterSocialItem';
import MenuFooterItem from '../MenuFooterItem/MenuFooterItem';
import MenuTitle from '../MenuTitle/MenuTitle';
import styles from './MenuFooter.module.css';
import { MenuFooterProps } from './MenuFooter.props';
import cn from 'classnames';
import { RootState, selectFilteredCategory } from '../../../store';
import { useSelector} from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import AnchorNavItem from '../../AnchorNavItem/AnchorNavItem';
import { fetchCategory } from '../../../slices/categorySlice';
import { fetchContacts } from '../../../slices/contactSlice';
import { catalog } from '../../../utils/constants';



function MenuFooter({className, ...props }: MenuFooterProps) {

	const {phones, emails} = useSelector((state: RootState) => state.contacts.contacts);
	
	const categories = useAppSelector((state: RootState) => selectFilteredCategory(state));

	const { isLoading }  = useAppSelector((state: RootState) => state.categories);

	const dispatch = useAppDispatch();

	const memoizedPhones = useMemo(() => phones.slice(), [phones]);
	const memoizedEmails = useMemo(() => emails.slice(), [emails]);

	useEffect(() => {
		if (categories.length === 0 && !isLoading) {
			dispatch(fetchCategory());
		}
	}, [dispatch, categories.length, isLoading]);

	useEffect(() => {
		if ((phones.length === 0 || emails.length === 0) && !isLoading) {
			dispatch(fetchContacts());
		}
		
	},  [dispatch, phones.length, emails.length, isLoading]);

	return (
		<div className={cn(styles['menu-footer'], className)} {...props}>
			<MenuFooterItem>
				<MenuTitle>Категории</MenuTitle>
				{
					categories.map((item) => (
						<NavItem to={catalog+item.slug} key={item.name} className={cn(styles['contact-text'])} >{item.name}</NavItem>
					)
						
					)
				}
			</MenuFooterItem>

			<MenuFooterItem>
				<MenuTitle>Информация</MenuTitle>
				<NavItem to='/' className={cn(styles['contact-text'])}>Доставка и оплата</NavItem>
				<NavItem to='/' className={cn(styles['contact-text'])}>Возврат товара</NavItem>
				<NavItem to='/' className={cn(styles['contact-text'])}>Установка</NavItem>
			</MenuFooterItem>

			<MenuFooterItem>
				<MenuTitle>Социальные сети</MenuTitle>
				<AnchorNavItem href='https://wa.me/+11111111111?text=Здравствуйте' className={cn(styles['contact-text']) } target='blank'>
					<FooterSocialItem>
						<img src="/social/whatsapp logo.svg" alt="Логотип WhatsApp"/>   
                        WhatsApp
					</FooterSocialItem>
				</AnchorNavItem>
				<AnchorNavItem href='viber://chat?number=+11111111111' className={cn(styles['contact-text'])} target='blank'>
					<FooterSocialItem>
						<img src="/social/viber logo.svg" alt="Логотип Viber"/>   
                        Viber
					</FooterSocialItem>
				</AnchorNavItem>

				<AnchorNavItem href='https://t.me/+11111111111' className={cn(styles['contact-text'])} target='blank'>
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

