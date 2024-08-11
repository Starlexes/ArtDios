import PropertyFilter from '../PropertyFilter/PropertyFilter';
import styles from './CharsFilter.module.css';
import { CharsFilterProps } from './CharsFilter.props';
import cn from 'classnames';

function CharsFilter({chars, className }: CharsFilterProps) {

	return (
		<aside>
			<div className={cn(styles['main-filter'], className)}>
				<h2 className={cn(styles['filters-title'], className)}>Фильтр</h2>

				{chars.map((item, index) => (
					<PropertyFilter item={item} key={index} />
				))}
			</div>
		</aside>
	);
}

export default CharsFilter;