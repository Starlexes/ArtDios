import NavItem from '../../Header/NavItem/NavItem';
import FooterSocialItem from '../FooterSocialItem/FooterSocialItem';
import MenuFooterItem from '../MenuFooterItem/MenuFooterItem';
import MenuTitle from '../MenuTitle/MenuTitle';
import styles from './MenuFooter.module.css';
import { MenuFooterProps } from './MenuFooter.props';
import cn from 'classnames';
import { RootState, selectFilteredCategory } from '../../../store';
import { useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import AnchorNavItem from '../../AnchorNavItem/AnchorNavItem';
import { fetchCategory } from '../../../slices/categorySlice';
import { catalog, deliveryPaymentsRoute, mediaImagesPath, serviceRoute } from '../../../utils/constants';
import { fetchContacts } from '../../../slices/contactSlice';



function MenuFooter({className, ...props }: MenuFooterProps) {

	const {contacts, isLoading: isLoadingContacts} = useSelector((state: RootState) => state.contacts);
	const {phones, emails} = contacts;
	const categories = useAppSelector((state: RootState) => selectFilteredCategory(state));
	const { isLoading }  = useAppSelector((state: RootState) => state.categories);
	const [isFetched, setIsFetched] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!isFetched) {
			setIsFetched(true);
			if (categories.length === 0 && !isLoading) {
				dispatch(fetchCategory());
			}
			if (!isLoadingContacts) {
				dispatch(fetchContacts());
			}
		}
	}, [dispatch, categories.length, isLoading, isFetched, isLoadingContacts]);


	return (
		<div className={cn(styles['menu-footer'], className)} {...props}>
			<MenuFooterItem>
				<MenuTitle>Категории</MenuTitle>
				{
					categories.length > 0 && categories.map((item) => (
						<NavItem to={catalog+item.slug} key={item.name} className={cn(styles['contact-text'])} >{item.name}</NavItem>
					)
						
					)
				}
			</MenuFooterItem>

			<MenuFooterItem>
				<MenuTitle>Информация</MenuTitle>
				<NavItem to={deliveryPaymentsRoute} className={cn(styles['contact-text'])}>Доставка и оплата</NavItem>
				<NavItem to={deliveryPaymentsRoute+'#returning-product'} isHashLink={true}  className={cn(styles['contact-text'])}>Возврат товара</NavItem>
				<NavItem to={serviceRoute} className={cn(styles['contact-text'])}>Услуги</NavItem>
			</MenuFooterItem>

			<MenuFooterItem>
				<MenuTitle>Социальные сети</MenuTitle>
				<AnchorNavItem href='https://wa.me/+11111111111?text=Здравствуйте' className={cn(styles['contact-text']) } target='blank'>
					<FooterSocialItem>
						<img src={mediaImagesPath+'/social/whatsapp logo.svg'} alt="Логотип WhatsApp"/>   
                        WhatsApp
					</FooterSocialItem>
				</AnchorNavItem>
				<AnchorNavItem href='viber://chat?number=+11111111111' className={cn(styles['contact-text'])} target='blank'>
					<FooterSocialItem>
						<img src={mediaImagesPath+'/social/viber logo.svg'} alt="Логотип Viber"/>   
                        Viber
					</FooterSocialItem>
				</AnchorNavItem>

				<AnchorNavItem href='https://t.me/+11111111111' className={cn(styles['contact-text'])} target='blank'>
					<FooterSocialItem>
						<img src={mediaImagesPath+'/social/telegram logo.svg'} alt="Логотип Telegram"/>   
                        Telegram
					</FooterSocialItem>
				</AnchorNavItem>
					
			</MenuFooterItem>

			<MenuFooterItem>
				<MenuTitle>Контакты</MenuTitle>
				{phones.length > 0 && phones.map(item => (
					<AnchorNavItem className={cn(styles['contact-text'])} href={`tel:${item}`} key={item}>
						{item}
					</AnchorNavItem>
				))}

				{emails.length > 0 && emails.map(item => (
					<AnchorNavItem className={cn(styles['contact-text'])} href={`mailto:${item}`} key={item}>
						{item}
					</AnchorNavItem>
				))}
			</MenuFooterItem>
		</div>
	);
}

export default MenuFooter;

