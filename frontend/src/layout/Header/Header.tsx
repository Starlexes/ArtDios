
import { memo, useEffect } from 'react';
import LinkMenu from '../../components/Header/LinkMenu/LinkMenu';
import Navigation from '../../components/Header/Navigation/Navigation';
import TopPanel from '../../components/Header/TopPanel/TopPanel';
import styles from './Header.module.css';
import cn from 'classnames';
import { useMediaPredicate } from 'react-media-hook';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setMediaBurgerClick, setMediaSearchClick, setMediaSearchInitial } from '../../slices/buttonSlice';


const Header = memo(function Header() {

	const { isClicked } = useSelector((state: RootState) => state.buttons.modalSearchButton);
	const dispatch = useDispatch();

	const matches = useMediaPredicate('(min-width: 881px)');

	useEffect(() => {
		if (matches) {
			dispatch(setMediaSearchClick(false));
			dispatch(setMediaSearchInitial(true));
			dispatch(setMediaBurgerClick(false));
		}
				
	}, [matches, dispatch]);
	
	useEffect(() => {
		if (isClicked) {
			dispatch(setMediaSearchInitial(false));
		}
	
	}, [isClicked, dispatch]);
		
	return (
		<header className={cn(styles['header'])}>
			{matches && <Navigation/>}
			<TopPanel/>
			<LinkMenu/>
			
		</header>
	);
});

export default Header;