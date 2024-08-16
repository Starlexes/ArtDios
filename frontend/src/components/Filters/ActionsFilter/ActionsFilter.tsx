import { useDispatch } from 'react-redux';
import Button from '../../Header/Button/Button';
import styles from './ActionsFilter.module.css';
import { ActionsFilterProps } from './ActionsFilter.props';
import cn from 'classnames';
import { setClearClick, setSubmitClick} from '../../../slices/buttonSlice';
import { useLocation, useNavigate } from 'react-router-dom';

function ActionsFilter({ className }: ActionsFilterProps) {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const onClickClear = () => {
		dispatch(setClearClick(true));
		navigate(location.pathname);
	};

	const onClickSubmit = () => {
		dispatch(setSubmitClick(true));	
	};

	return (
		
		<div className={cn(styles['actions-filter'], className)}>
			<label>
				<Button className={cn(styles['submit-btn'])} onClick={onClickSubmit} type='submit'>
                Применить
				</Button>
			</label>

			<label>
				<Button className={cn(styles['clear-btn'])} onClick={onClickClear}>
                Сбросить
				</Button>
			</label>

		</div>
		
	);
}

export default ActionsFilter;