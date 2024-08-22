import { createBrowserRouter } from 'react-router-dom';
import ClientLayout from './layout/ClientLayout/ClientLayout';
import Error from './pages/Error/Error';
import Catalog from './pages/Catalog/Catalog';
import { catalog, contactsRoute, customContractRoute, deliveryPaymentsRoute, galleryRoute, opdPageRoute, products, promotionRoute, publicOfferRoute, seachingRoute, serviceRoute } from './utils/constants';
import ProductCard from './pages/ProductCard/ProductCard';
import Gallery from './pages/Gallery/Gallery';
import Contacts from './pages/Contacts/Contacts';
import Lending from './pages/Lending/Lending';
import Promotions from './pages/Promotions/Promotions';
import PromotionCard from './pages/PromotionCard/PromotionCard';
import OPDPage from './pages/OPDPage/OPDPage';
import PublicOffer from './pages/PublicOffer/PublicOffer';
import CustomContract from './pages/CustomContract/CustomContract';
import Service from './pages/Service/Service';
import DeliveryPayments from './pages/DeliveryPayments/DeliveryPayments';


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
				path: `${catalog}${seachingRoute}`,
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
				path: `${opdPageRoute}`,
				element: <OPDPage/>
			},
			{
				path: `${publicOfferRoute}`,
				element: <PublicOffer/>
			},
			{
				path: `${customContractRoute}`,
				element: <CustomContract/>
			},
			{
				path: `${serviceRoute}`,
				element: <Service/>
			},
			{
				path: `${deliveryPaymentsRoute}`,
				element: <DeliveryPayments/>
			},
			{
				path: '*',
				element: <Error/>
			}
		]
	}
]);

export default router;