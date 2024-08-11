import styles from './PageTitle.module.css';
import cn from 'classnames';
import { PageTitleProps } from './PageTitle.props';

function PageTitle({className, children}: PageTitleProps) {

	return (	
		<h1 className={cn(styles['title'], className)}>{children}</h1>
	);
}

export default PageTitle;