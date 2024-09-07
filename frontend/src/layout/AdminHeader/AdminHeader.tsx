
import { useLocation } from 'react-router-dom';
import LogOutButton from '../../admin-components/LogOutButton/LogOutButton';
import NavItem from '../../components/Header/NavItem/NavItem';
import Search from '../../components/Header/Search/Search';
import { adminEditCatalog, adminHomeRoute, adminRoute } from '../../utils/constants';
import { checkAuthenticated } from '../../utils/help-funcs';
import styles from './AdminHeader.module.css';
import cn from 'classnames';
import { useEffect, useState } from 'react';


function AdminHeader() {

	const location = useLocation();

	const pathname = location.pathname;
	const [isShowSearch, setIsShowSearch] = useState<boolean>(false);

	useEffect(() => {
		if (pathname.includes(adminEditCatalog)) {
			!isShowSearch && setIsShowSearch(true);
		} else {
			isShowSearch && setIsShowSearch(false);
		}
		
	}, [pathname, isShowSearch]);

	return (
		<header>
			
			<div className={cn(styles['header'], {
				[styles['show-search']]: isShowSearch
			})}>
				<NavItem to={adminRoute+adminHomeRoute}>
					<div className={cn(styles['header-content'])}>
						<span>
                    Админ-панель -
						</span>
						<span className={cn(styles['logo'])}>АРТДИОС</span>
					</div>
				</NavItem>
				{checkAuthenticated() && <LogOutButton/>}

				{checkAuthenticated() && isShowSearch &&
					<div className={cn(styles['search-menu'])}>
						<Search isAdmin={true}/>
					</div>
				}
			</div>			
		</header>
	);
}

export default AdminHeader;