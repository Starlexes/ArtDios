import styles from './ContactsItem.module.css';
import cn from 'classnames';
import { ContactsItemProps } from './ContactsItem.props';


function ContactsItem({className, children }: ContactsItemProps) {

	return (
		
		<div className={cn(styles['contacts-item'], className)}>
			{children}		
		</div>	
	);

}

export default ContactsItem;