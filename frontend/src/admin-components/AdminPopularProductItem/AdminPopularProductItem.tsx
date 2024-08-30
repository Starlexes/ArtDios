
import styles from './AdminPopularProductItem.module.css';
import { AdminPopularProductItemProps } from './AdminPopularProductItem.props';
import cn from 'classnames';
import PopularProductItem from '../../components/PopularProductItems/PopularProductItem/PopularProductItem';
import Button from '../../components/Header/Button/Button';



function AdminPopularProductItem({children, className, active, ...props }: AdminPopularProductItemProps) {

	
	return (
		<Button className={cn(styles['pop-btn'])}>
			<PopularProductItem className={cn({
				[styles['active']]: active
			}, styles['pop-item'], className)} {...props}>
				{children}
			</PopularProductItem>
		</Button>
	);
}

export default AdminPopularProductItem;

