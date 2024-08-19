import styles from './ContactsContent.module.css';
import cn from 'classnames';
import { ContactsContentProps } from './ContactsContent.props';


function ContactsContent({className, children }: ContactsContentProps) {

	return (
		
		<div className={cn(styles['contacts-content'], className)}>
			{children}		
		</div>	
	);

}

export default ContactsContent;