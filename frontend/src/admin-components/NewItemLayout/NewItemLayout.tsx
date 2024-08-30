
import styles from './NewItemLayout.module.css';
import { NewItemLayoutProps } from './NewItemLayout.props';
import cn from 'classnames';



function NewItemLayout({ className, children }: NewItemLayoutProps) {

	return (
		
		<div className={cn(styles['item-layout'], className)}>
			{children}
		</div>
		
           
	);

}

export default NewItemLayout;