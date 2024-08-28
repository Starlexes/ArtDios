import NavItem from '../../components/Header/NavItem/NavItem';
import styles from './ModelItem.module.css';
import { ModelItemProps } from './ModelItem.props';
import cn from 'classnames';



function ModelItem({ className, children, link, linkClassName }: ModelItemProps) {

	return (
		<NavItem to={link} className={cn(styles['item-link'], linkClassName)}>
			<div className={cn(styles['model-item'], className)}>
				{children}
			</div>
		</NavItem>
           
	);

}

export default ModelItem;