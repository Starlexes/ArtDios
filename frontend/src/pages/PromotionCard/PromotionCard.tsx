import styles from './PromotionCard.module.css';
import { PromotionCardProps } from './PromotionCard.props';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { AppDispatch, RootState} from '../../store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../Error/Error';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { fetchPromotionCard } from '../../slices/promotionCardSlice';
import PageHead from '../../components/PageHead/PageHead';
import axios from 'axios';
import { mediaImagesPath } from '../../utils/constants';
import DOMPurify from 'dompurify';

function PromotionCard({className }: PromotionCardProps) {

	const { promotion: promoParam} = useParams<{ promotion: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const [currentPromo, setCurrentPromo] = useState<string>('');
	
	const {promotion, error: promoError, isLoading } = useAppSelector((state: RootState) => state.promotionCard);
	
	const DisplayContent = ( htmlContent: string ) => {
		const cleanHTML = DOMPurify.sanitize(htmlContent);
		return <div className={cn(styles['promotion-desc'])} dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
	};

	useEffect(() => {
		if (currentPromo !== promoParam) {
			setCurrentPromo(promoParam as string);
			if (promoParam) {
				dispatch(fetchPromotionCard(promoParam));
			}
		}
	}, [dispatch, promoParam, currentPromo]);
	
	return (
		!promoError || !promotion?
			isLoading? <Spinner/>: 
				<section>
					<div className={cn(styles['promotion'], className)}>
						<HelmetProvider>
							<Helmet>
								<title>{promotion.name}</title>
							</Helmet>
						</HelmetProvider>
						<PageHead>{promotion.name}</PageHead>
						<div className={cn(styles['promotion-content'], className)}>
							<img src={mediaImagesPath+'/other/promo-cover.png'} alt="Promo cover"className={cn(styles['promotion-cover'])} />
							<div className={cn(styles['promotion-image'])}>
								<img src={axios.defaults.baseURL+promotion.main_image} alt={promotion.name}/>
							</div>
							{DisplayContent(promotion.description)}
						</div>
					</div>
				</section>
			: <Error/>
	);

}

export default PromotionCard;