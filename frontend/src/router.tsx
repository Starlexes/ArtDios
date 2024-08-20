import { createBrowserRouter } from 'react-router-dom';
import ClientLayout from './layout/ClientLayout/ClientLayout';
import Error from './pages/Error/Error';
import Catalog from './pages/Catalog/Catalog';
import { catalog, contactsRoute, galleryRoute, products, promotionRoute } from './utils/constants';
import ProductCard from './pages/ProductCard/ProductCard';
import Gallery from './pages/Gallery/Gallery';
import Contacts from './pages/Contacts/Contacts';
import Lending from './pages/Lending/Lending';
import Promotions from './pages/Promotions/Promotions';
import PromotionCard from './pages/PromotionCard/PromotionCard';


const router = createBrowserRouter([
	{
		path: '/',
		element: <ClientLayout/>,
		children: [
			{
				path: '/',
				element: <Lending/>
			},
			{
				path: `${catalog}:category`,
				element: <Catalog/>
			},
			{
				path: `${products}:product`,
				element: <ProductCard/>
			},
			{
				path: `${galleryRoute}`,
				element: <Gallery/>
			},
			{
				path: `${contactsRoute}`,
				element: <Contacts/>
			},
			{
				path: `${promotionRoute}`,
				element: <Promotions/>
			},
			{
				path: `${promotionRoute}:promotion`,
				element: <PromotionCard/>
			},
			{
				path: '*',
				element: <Error/>
			}
		]
	}
]);

export default router;