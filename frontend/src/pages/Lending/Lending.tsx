import styles from './Lending.module.css';
import { LendingProps } from './Lending.props';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { AppDispatch, RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategory } from '../../slices/categorySlice';


function Lending({className }: LendingProps) {
	const dispatch = useDispatch<AppDispatch>();
	const { categories } = useAppSelector((state: RootState) => state.categories);

	useEffect(() => {
		if (!categories.length) {
			dispatch(fetchCategory());
		}
	}, [dispatch, categories.length]);

	
	return (
		<section>
			<div className={cn(styles['lending'], className)}>
                ...
			</div>	
		</section>

	);

}

export default Lending;