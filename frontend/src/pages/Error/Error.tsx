import styles from './Error.module.css';
import cn from 'classnames';
import { ErrorProps } from './Error.props';
import Button from '../../components/Header/Button/Button';
import NavItem from '../../components/Header/NavItem/NavItem';
import PageHead from '../../components/PageHead/PageHead';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function Error({className, onClickBack}: ErrorProps) {

	
	return (
		<section>
			<div className={cn(styles['error-page'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Ошибка</title>
					</Helmet>
				</HelmetProvider>
				<PageHead onClickBack={onClickBack}>
				Страница не найдена
				</PageHead>

				<NavItem className={cn(styles['error-link'])} to={'/'}>
					<Button className={cn(styles['error-btn'])} onClick={onClickBack}>Перейти на главную</Button>
				</NavItem>
			
			</div>
		</section>
	);
}

export default Error;