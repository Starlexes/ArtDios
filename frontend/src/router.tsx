import { createBrowserRouter } from 'react-router-dom';
import ClientLayout from './layout/ClientLayout/ClientLayout';
import Error from './pages/Error/Error';
import Catalog from './pages/Catalog/Catalog';
import { catalog, products } from './utils/constants';


const router = createBrowserRouter([
	{
		path: '/',
		element: <ClientLayout/>,
		children: [
			{
				path: '*',
				element: <Error />
			},
			{
				path: `${catalog}:category`,
				element: <Catalog />
			},
			{
				path: `${products}:product`,
				element: <Error />
			}
		]
	}
]);

export default router;