import styles from './Error.module.css';
import cn from 'classnames';
import { ErrorProps } from './Error.props';
import Button from '../../components/Header/Button/Button';
import NavItem from '../../components/Header/NavItem/NavItem';
import BackButton from '../../components/BackButton/BackButton';

function Error({className}: ErrorProps) {

	
	return (
		
		<>
			<div className={cn(styles['error-page'], className)}>
				<h1 className={cn(styles['error-title'])}>Страница не найдена</h1>
				<NavItem className={cn(styles['error-link'])} to={'/'}>
					<Button className={cn(styles['error-btn'])}>Перейти на главную</Button>
				</NavItem>
				<BackButton/>
			</div>
			
		</>
	);
}

export default Error;