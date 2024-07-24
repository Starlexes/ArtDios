
import Logo from '../../Header/Logo/Logo';
import NavigationList from '../../Header/NavigationList/NavigationList';
import { Link } from '../../Header/NavigationList/NavigationList.props';
import styles from './NavFooter.module.css';
import { NavFooterProps } from './NavFooter.props';
import cn from 'classnames';

function NavFooter({className, ...props }: NavFooterProps) {

	const links: Link[] = [
		{ children: '© 2024 - artdios.ru', type: 'main', className: 'nav-footer', isText: true},
		{ children: 'Все права защищены', type: 'main', className: 'nav-footer', isText: true},
		{ link: '#', children: 'Обработка персональных данных', type: 'main', className: 'nav-footer'},
		{ link: '#', children: 'Публичная оферта', type: 'main', className: 'nav-footer'},
		{ link: '#', children: 'Пользовательское соглашение', type: 'main', className: 'nav-footer'}
	];

	return (
		<div className={cn(styles['nav-footer'], className)} {...props}>
			<Logo className='logo-footer' isFooter={true}/>
			<NavigationList links={links} className='nav-footer'/>
		</div>
	);
}

export default NavFooter;