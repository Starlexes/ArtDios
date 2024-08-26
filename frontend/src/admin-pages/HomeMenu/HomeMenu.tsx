
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import styles from './HomeMenu.module.css';
import { HomeMenuProps } from './HomeMenu.props';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';


function HomeMenu({className }: HomeMenuProps) {

	
	return (
		
		<section>
			<div className={cn(styles['home-menu'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Главная</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Главная
				</AdminPageHead>
                
				
		
			</div>
		</section>
	
	);

}

export default HomeMenu;