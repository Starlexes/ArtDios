import { useDispatch } from 'react-redux';
import Button from '../../Header/Button/Button';
import styles from './SubmitButton.module.css';
import { SubmitButtonProps } from './SubmitButton.props';
import cn from 'classnames';
import { setSubmitClick} from '../../../slices/buttonSlice';


function SubmitButton({ className }: SubmitButtonProps) {

	const dispatch = useDispatch();

	const onClickSubmit = () => {
		dispatch(setSubmitClick(true));	
	};
	return (
		
		<Button className={cn(styles['main-submit'], className)} onClick={onClickSubmit} type='submit'>
            Применить
		</Button>	
	);
}

export default SubmitButton;