import styles from './ContactsImage.module.css';
import cn from 'classnames';
import { ContactsImageProps } from './ContactsImage.props';


function ContactsImage({className, children }: ContactsImageProps) {

	return (
		
		<div className={cn(styles['contacts-image'], className)}>
			{children}		
		</div>	
	);

}

export default ContactsImage;