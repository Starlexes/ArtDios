import styles from './PageHead.module.css';
import cn from 'classnames';
import { PageHeadProps } from './PageHead.props';
import PageTitle from '../PageTitle/PageTitle';
import BackButton from '../BackButton/BackButton';

function PageHead({className, children, titleClassName}: PageHeadProps) {

	return (	
		<div className={cn(styles['page-head'], className)}>
			<BackButton/>

			<div className={cn(styles['page-title'], titleClassName)}>
				<PageTitle>
					{children}
				</PageTitle>
			</div>
		</div>
	);
}

export default PageHead;