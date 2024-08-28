import { createBrowserRouter } from 'react-router-dom';
import ClientLayout from './layout/ClientLayout/ClientLayout';
import Error from './pages/Error/Error';
import Catalog from './pages/Catalog/Catalog';
import { aboutRoute, adminEditCategory, adminEditCategoryMenuRoute, adminEditCategoryRoute, adminEditProductTypesRoute, adminEditSubCategoryRoute, adminHomeRoute, adminLoginRoute, adminRoute, catalog, contactsRoute, customContractRoute, deliveryPaymentsRoute, galleryRoute, opdPageRoute, products, promotionRoute, publicOfferRoute, seachingRoute, serviceRoute } from './utils/constants';
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
import About from './pages/About/About';
import AdminLayout from './layout/AdminLayout/AdminLayout';
import { RequireAuth } from './utils/RequireAuth';
import LoginForm from './admin-components/LoginForm/LoginForm';
import HomeMenu from './admin-pages/HomeMenu/HomeMenu';
import EditCategoryMenu from './admin-pages/EditCategoryMenu/EditCategoryMenu';
import EditProductTypes from './admin-pages/EditProductTypes/EditProductTypes';
import EditCategory from './admin-pages/EditCategory/EditCategory';
import EditSubCategory from './admin-pages/EditSubCategory/EditSubCategory';


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
				path: `${aboutRoute}`,
				element: <About/>
			},
			{
				path: '*',
				element: <Error/>
			}
		]
	},
	{
		path: `${adminRoute}${adminLoginRoute}`,
		element: <AdminLayout/>,
		children: [{
			
			path: `${adminRoute}${adminLoginRoute}`,
			element: <LoginForm/>
			
		}] 
	},
	{
		path: `${adminRoute}${adminHomeRoute}`,
		element: <RequireAuth><AdminLayout/></RequireAuth> ,
		children: [
			
			{
				path: `${adminRoute}${adminHomeRoute}`,
				element: <HomeMenu/>
			},
			{
				path: `${adminEditCategory}`,				
				children: [
					{
						path: adminEditCategoryMenuRoute,
						element: <EditCategoryMenu/>
					},
					{
						path: adminEditProductTypesRoute,
						element: <EditProductTypes/>
					},
					{
						path: adminEditCategoryRoute,
						element: <EditCategory/>
					},
					{
						path: adminEditSubCategoryRoute,
						element: <EditSubCategory/>
					}
					

					
				]

			}
			

			
		]
	}
]);

export default router;