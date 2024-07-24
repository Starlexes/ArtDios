import styles from './FooterSocialItem.module.css';
import { FooterSocialItemProps } from './FooterSocialItem.props';
import cn from 'classnames';

function FooterSocialItem({children, className, ...props }: FooterSocialItemProps) {
	return (
		<div className={cn(styles['social-item'], className)} {...props}>
			{children}
		</div>
	);
}

export default FooterSocialItem;