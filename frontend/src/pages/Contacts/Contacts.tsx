import styles from './Contacts.module.css';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import Spinner from '../../components/Spinner/Spinner';
import { Helmet, HelmetProvider} from 'react-helmet-async';
import Error from '../Error/Error';
import PageHead from '../../components/PageHead/PageHead';
import { ContactsProps } from './Contacts.props';
import ContactsItems from '../../components/ContactsItems/ContactsItems/ContactsItems';
import ContactsItem from '../../components/ContactsItems/ContactsItem/ContactsItem';
import ContactsImage from '../../components/ContactsItems/ContactsImage/ContactsImage';
import ContactsContent from '../../components/ContactsItems/ContactsContent/ContactsContent';
import { addressContacts, hoursContacts, mailContacts, phoneContacts, socialContacts } from '../../utils/constants';
import NavSocial from '../../components/Header/NavSocial/NavSocial';
import AnchorNavItem from '../../components/AnchorNavItem/AnchorNavItem';


function Contacts({className }: ContactsProps) {

	const { contacts, isLoading, error } = useAppSelector((state: RootState) => state.contacts);
	const {phones, addresses, emails, workingHours} = contacts;
	const openTime = String(workingHours.openingHours).length < 2? '00:00': String(workingHours.openingHours).slice(0, 5);
	const closeTime = String(workingHours.closingHours).length < 2? '00:00': String(workingHours.closingHours).slice(0, 5);
	
	return (
		!error? 
			isLoading? <Spinner/>: 
				<section>
					<div className={cn(styles['contacts'], className)}>
						<HelmetProvider>
							<Helmet>
								<title>Контакты</title>
							</Helmet>
						</HelmetProvider>
						<PageHead>
                        Контакты
						</PageHead>
						<ContactsItems>
							<ContactsItem>
								<ContactsImage>
									{phoneContacts()}
								</ContactsImage>
								<ContactsContent className={cn(styles['phones-content'])}>
									<AnchorNavItem href={`tel:${phones.length > 0? phones[0]: '#'}`}
										className={cn(styles['phone-link'], styles['link-content'])}
									>{phones.length > 0? phones[0]: ''}</AnchorNavItem>
									<AnchorNavItem href={`tel:${phones.length > 0? phones[1]: '#'}`}
										className={cn(styles['phone-link'], styles['link-content'])}
									>{phones.length > 0? phones[1]: ''}</AnchorNavItem>
								</ContactsContent>
							</ContactsItem>

							<ContactsItem>
								<ContactsImage>
									{mailContacts()}
								</ContactsImage>
								<ContactsContent>
								
									<AnchorNavItem href={`mailto:${emails.length > 0? emails[0]: ''}`}
										className={cn(styles['link-content'])}
									>{emails.length > 0? emails[0]: ''}</AnchorNavItem>
								</ContactsContent>
							</ContactsItem>

							<ContactsItem>
								<ContactsImage>
									{addressContacts()}
								</ContactsImage>
								<ContactsContent>
									{addresses.length > 0? addresses[0]: ''}
								</ContactsContent>
							</ContactsItem>

							<div className={cn(styles['bottom-item'])}>

								<ContactsItem className={cn(styles['social-item'])}>
									<ContactsImage>
										{socialContacts()}
									</ContactsImage>
									<ContactsContent className={cn(styles['social-content'])}> 						
										<span>Социальные сети:</span>
										<NavSocial className={cn(styles['social-links'])}/>							
									</ContactsContent>
								</ContactsItem>

								<ContactsItem className={cn(styles['hours-item'])}>
									<ContactsImage>
										{hoursContacts()}
									</ContactsImage>
									<ContactsContent className={cn(styles['hours-content'])}>								
										<span>Время работы:</span>
										<span>c {openTime} до {closeTime}</span>									
									</ContactsContent>
								</ContactsItem>
							</div>
						</ContactsItems>
					</div>	
				</section>
			: <Error/>
	);

}

export default Contacts;