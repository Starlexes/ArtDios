import styles from './ContactsItems.module.css';
import cn from 'classnames';
import { ContactsItemsProps } from './ContactsItems.props';


function ContactsItems({className, children }: ContactsItemsProps) {

	return (
		
		<div className={cn(styles['contacts-items'], className)}>
			{children}		
		</div>	
	);

}

export default ContactsItems;