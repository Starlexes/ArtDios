
import styles from './NewItemLayout.module.css';
import { NewItemLayoutProps } from './NewItemLayout.props';
import cn from 'classnames';



function NewItemLayout({ className, children, dark=true }: NewItemLayoutProps) {

	return (
		
		<div className={cn(styles['item-layout'], {
			[styles['dark']]: dark,
			[styles['light']]: !dark
		},  className)}>
			{children}
		</div>
		
           
	);

}

export default NewItemLayout;