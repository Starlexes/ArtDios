import { useLocation } from 'react-router-dom';
import { orderASC, orderDSC } from '../../../utils/constants';
import styles from './SortingOrder.module.css';
import { SortingOrderProps } from './SortingOrder.props';
import cn from 'classnames';
import NavItem from '../../Header/NavItem/NavItem';

function SortingOrder({ className }: SortingOrderProps) {

	const location = useLocation();
	const url = location.pathname;
	const search = location.search.replace(/([&?])sort-by=[^&]*/g, '');
	return (
		<div className={cn(styles['sorting-order'], className)}>
			<NavItem to={{
				pathname: url,
				search: `${search? search+'&': ''}sort-by=asc`}}>
				<div className={cn(styles['sort-filter'])}>
					{orderASC()}
                Самые дешевые
				</div>
			</NavItem>

			<NavItem to={{
				pathname: url,
				search: `${search? search+'&': '?'}sort-by=desc`}}>
				<div className={cn(styles['sort-filter'])}>
					{orderDSC()}
                Самые дорогие
				</div>
			</NavItem>
			
			
		</div>
	);
}

export default SortingOrder;