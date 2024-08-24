import useScrollToTop from '../../hooks/useScrollToTop';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MainPanel from '../MainPanel/MainPanel';

function ClientLayout() {
	useScrollToTop();
	
	return (
		<>
			<Header/>
			<MainPanel/>
			<Footer/>
		</>
	);
}

export default ClientLayout;