import NavigationListItem from '../NavigationListItem/NavigationListItem';
import NavItem from '../NavItem/NavItem';
import NavSocial from '../NavSocial/NavSocial';
import styles from './NavigationList.module.css';
import { NavigationListProps } from './NavigationList.props';
import cn from 'classnames';

function NavigationList({links, className}: NavigationListProps) {
	return (
		<nav>
			<ul>
				<div className={cn(styles['contacts__header'], {
					[styles['link-menu']]: className === 'link-menu'
				})}>
					{links.map((item) => (
						<NavigationListItem>
							{item.type === 'main' ? (
								<NavItem className={item.className} href={item.link}>
									{item.children}
								</NavItem>
							) : (
								<NavSocial className={item.className} />
							)}
						</NavigationListItem>
					))}

				</div>
			</ul>
		</nav>
	);
}

export default NavigationList;