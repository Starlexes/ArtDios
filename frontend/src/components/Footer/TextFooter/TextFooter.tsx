import styles from './TextFooter.module.css';
import { TextFooterProps } from './TextFooter.props';
import cn from 'classnames';


function TextFooter({children, className, ...props}: TextFooterProps) {
	return (
		<span className={cn(styles['text-footer'], className)} {...props}>{children}</span>	
	);
}

export default TextFooter;