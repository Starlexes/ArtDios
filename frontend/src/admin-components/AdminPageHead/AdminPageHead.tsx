
import PageHead from '../../components/PageHead/PageHead';
import styles from './AdminPageHead.module.css';
import { AdminPageHeadProps } from './AdminPageHead.props';
import cn from 'classnames';



function AdminPageHead({ className, children }: AdminPageHeadProps) {

	
	return (
		
		<PageHead className={cn(styles['page-head'], className)} backClassName={cn(styles['back-btn'])}>
			{children}
		</PageHead>
           
	);

}

export default AdminPageHead;