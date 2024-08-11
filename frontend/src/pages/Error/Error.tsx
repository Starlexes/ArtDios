import styles from './Error.module.css';
import cn from 'classnames';
import { ErrorProps } from './Error.props';
import Button from '../../components/Header/Button/Button';
import NavItem from '../../components/Header/NavItem/NavItem';
import PageHead from '../../components/PageHead/PageHead';

function Error({className}: ErrorProps) {

	
	return (
	
		<div className={cn(styles['error-page'], className)}>
			<PageHead>
				Страница не найдена
			</PageHead>

			<NavItem className={cn(styles['error-link'])} to={'/'}>
				<Button className={cn(styles['error-btn'])}>Перейти на главную</Button>
			</NavItem>
			
		</div>
	);
}

export default Error;