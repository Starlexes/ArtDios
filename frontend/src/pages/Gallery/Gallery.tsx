import styles from './Gallery.module.css';
import { GalleryProps } from './Gallery.props';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { AppDispatch, RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { Helmet, HelmetProvider} from 'react-helmet-async';
import Error from '../Error/Error';
import { fetchGallery } from '../../slices/gallerySlice';
import PageHead from '../../components/PageHead/PageHead';
import GalleryItem from '../../components/GalleryItems/GalleryItem/GalleryItem';


function Gallery({className }: GalleryProps) {
	const dispatch = useDispatch<AppDispatch>();
	const { gallery, isLoading, error } = useAppSelector((state: RootState) => state.gallery);

	useEffect(() => {
		dispatch(fetchGallery());	
	}, [dispatch]);

	
	return (
		!error? 
			isLoading? <Spinner/>: 
				<div className={cn(styles['gallery'], className)}>
					<HelmetProvider>
						<Helmet>
							<title>Галерея</title>
						</Helmet>
					</HelmetProvider>
					<PageHead>
                        Галерея
					</PageHead>
					{gallery.map((item, index) => (
						<GalleryItem key={index} gallery={item}
							type={index % 2 === 0? 'even': 'odd'}/>
					))}
				</div>	
			: <Error/>
	);

}

export default Gallery;