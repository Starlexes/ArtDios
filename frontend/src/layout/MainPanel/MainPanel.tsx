import styles from './MainPanel.module.css';
import cn from 'classnames';
import { MainPanelProps } from './MainPanel.props';
import { Outlet } from 'react-router-dom';
import SocialWidget from '../../components/SocialWidget/SocialWidget';
import { useMediaPredicate } from 'react-media-hook';

function MainPanel({className}: MainPanelProps) {

	const matches = useMediaPredicate('(min-width: 881px)');

	return (
		<main className={cn(styles['main'], className)}>
			<Outlet/>
			{ matches &&
				<SocialWidget/>
			}
		</main>
	);
}

export default MainPanel;