import styles from './Gallery.module.css';
import { GalleryProps } from './Gallery.props';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { AppDispatch, RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { Helmet, HelmetProvider} from 'react-helmet-async';
import Error from '../Error/Error';
import { fetchGallery } from '../../slices/gallerySlice';
import PageHead from '../../components/PageHead/PageHead';
import GalleryItem from '../../components/GalleryItems/GalleryItem/GalleryItem';


function Gallery({className }: GalleryProps) {
	const dispatch = useDispatch<AppDispatch>();
	const { gallery, isLoading, error } = useAppSelector((state: RootState) => state.gallery);
	const [isFetched, setIsFetched] = useState<boolean>(false);

	useEffect(() => {
		if (!isFetched) {
			setIsFetched(true);
			if (gallery.length === 0 && !isLoading) {
				dispatch(fetchGallery());
			}
		}	
	}, [dispatch, isFetched, gallery.length, isLoading]);

	
	return (
		!error? 
			isLoading? <Spinner/>: 
				<section>
					<div className={cn(styles['gallery'], className)}>
						<HelmetProvider>
							<Helmet>
								<title>Галерея</title>
							</Helmet>
						</HelmetProvider>
						<PageHead>
                        Галерея
						</PageHead>
						{gallery.length > 0 && gallery.map((item, index) => (
							<GalleryItem key={index} gallery={item}
								type={index % 2 === 0? 'even': 'odd'}/>
						))}
					</div>	
				</section>
			: <Error/>
	);

}

export default Gallery;