import { createBrowserRouter } from 'react-router-dom';
import ClientLayout from './layout/ClientLayout/ClientLayout';
import Error from './pages/Error/Error';
import Catalog from './pages/Catalog/Catalog';
import { catalog, galleryRoute, products } from './utils/constants';
import ProductCard from './pages/ProductCard/ProductCard';
import Gallery from './pages/Gallery/Gallery';


const router = createBrowserRouter([
	{
		path: '/',
		element: <ClientLayout/>,
		children: [
			{
				path: '*',
				element: <Error/>
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
			}
		]
	}
]);

export default router;