
import Logo from '../../Header/Logo/Logo';
import NavigationList from '../../Header/NavigationList/NavigationList';
import { Link } from '../../Header/NavigationList/NavigationList.props';
import styles from './NavFooter.module.css';
import { NavFooterProps } from './NavFooter.props';
import cn from 'classnames';

const links: Link[] = [
	{id: 1, children: '© 2024 - artdios.ru', type: 'main', className: 'nav-footer', isText: true},
	{id: 2, children: 'Все права защищены', type: 'main', className: 'nav-footer', isText: true},
	{id: 3, link: '#', children: 'Обработка персональных данных', type: 'main', className: 'nav-footer'},
	{id: 4, link: '#', children: 'Публичная оферта', type: 'main', className: 'nav-footer'},
	{id: 5, link: '#', children: 'Пользовательское соглашение', type: 'main', className: 'nav-footer'}
];

function NavFooter({className, ...props }: NavFooterProps) {

	return (
		<div className={cn(styles['nav-footer'], className)} {...props}>
			<Logo className='logo-footer' isFooter={true}/>
			<NavigationList links={links} className='nav-footer'/>
		</div>
	);
}

export default NavFooter;