
import { useParams } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { AppDispatch, RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { MouseEvent, useEffect, useState } from 'react';
import { fetchProductCard } from '../../slices/productCardSlice';
import ProductCardAbout from '../../components/ProductCardItems/ProductCardAbout/ProductCardAbout';
import ProductCardTitle from '../../components/ProductCardItems/ProductCardTitle/ProductCardTitle';
import ProductCardCode from '../../components/ProductCardItems/ProductCardCode/ProductCardCode';
import ProductCardDesc from '../../components/ProductCardItems/ProductCardDesc/ProductCardDesc';
import Spinner from '../../components/Spinner/Spinner';
import ProductCardPrice from '../../components/ProductCardItems/ProductCardPrice/ProductCardPrice';
import ProductOrder from '../../components/Products/ProductOrder/ProductOrder';
import ProductCardCharacteristics from '../../components/ProductCardItems/ProductCardCharacteristics/ProductCardCharacteristics';
import ProductCardImage from '../../components/ProductCardItems/ProductCardImage/ProductCardImage';
import axios from 'axios';
import ProductCardImageButton from '../../components/ProductCardItems/ProductCardImageButton/ProductCardImageButton';
import ProductCardImageButtonsMenu from '../../components/ProductCardItems/ProductCardImageButtonsMenu/ProductCardImageButtonsMenu';
import BackButton from '../../components/BackButton/BackButton';
import { useMediaPredicate } from 'react-media-hook';
import ProductCardArrowButton from '../../components/ProductCardItems/ProductCardArrowButton/ProductCardArrowButton';

function ProductCard({className }: ProductCardProps) {

	const { product: productParam} = useParams<{ product: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const { product, isLoading } = useAppSelector((state: RootState) => state.productCard);
	const [currentProduct, setCurrentProduct] = useState<string>('');
	const formattedPrice = product.new_price?
		product.new_price.toLocaleString('ru-RU') :
		product.price.toLocaleString('ru-RU');

	const matches = useMediaPredicate('(min-width: 751px)');

	const mainImagePath = axios.defaults.baseURL+product.image;
	const secondImagePath = product.second_image?
		String(axios.defaults.baseURL)+product.second_image: '';
	const thirdImagePath = product.third_image? 
		String(axios.defaults.baseURL)+product.third_image: '';

	const [currentImage, setCurrentImage] = useState<string>('');
	const [currentImageNumber, setCurrentImageNumber] = useState<number>(0);
	const images = [mainImagePath, secondImagePath, thirdImagePath];

	useEffect(() => {
		if (currentProduct !== productParam) {
			setCurrentProduct(productParam as string);
			if (productParam) {
				dispatch(fetchProductCard(productParam));
			}
			
		}
		mainImagePath && setCurrentImage(mainImagePath);
	}, [dispatch, currentProduct, productParam, mainImagePath]);

	const onClick = (e: MouseEvent<HTMLButtonElement>) => {
		const value = e.currentTarget.value;
		if (value === 'main') {
			setCurrentImage(mainImagePath);
			setCurrentImageNumber(0);
		} else if (value === 'second') {
			setCurrentImage(secondImagePath);
		} else {
			setCurrentImage(thirdImagePath);
		}
	};

	const nextImage = () => {
		setCurrentImageNumber((prevIndex) => (prevIndex + 1) % images.length);
	};

	const prevImage = () => {
		setCurrentImageNumber((prevIndex) => 
			(prevIndex - 1 + images.length) % images.length
		);
	};

	
	return (
		isLoading? <Spinner/>: 
			<div className={cn(styles['product-card'], className)}>
				<ProductCardImage>		
					{	matches &&	
						<ProductCardImageButtonsMenu>
							<ProductCardImageButton imagePath={mainImagePath} imageName={product.name} value='main' onClick={onClick}/>
							<ProductCardImageButton imagePath={secondImagePath} imageName={product.name} value='second' onClick={onClick}/>
							<ProductCardImageButton imagePath={thirdImagePath} imageName={product.name} value='third' onClick={onClick}/>
						</ProductCardImageButtonsMenu>
					}
					{
						!matches && <ProductCardArrowButton typeArrow='left' onClick={prevImage}/>
						
					}
					<div className={cn(styles['selected-image'])}>
						<img src={matches? currentImage: images[currentImageNumber]} alt={product.name} />
					</div>

					{
						!matches && <ProductCardArrowButton typeArrow='right' onClick={nextImage}/>
					}
						
				</ProductCardImage>
				
				<div className={cn(styles['product-info'])}>
					<ProductCardAbout>
						<BackButton className={cn(styles['back-btn-content'])} btnClassName={cn(styles['back-btn'])}/>
						<ProductCardTitle>{product.name}</ProductCardTitle>
						<ProductCardCode>{product.code}</ProductCardCode>
						<ProductCardDesc>{product.description}</ProductCardDesc>
						<ProductCardPrice>{formattedPrice}</ProductCardPrice>
						<ProductOrder className={cn(styles['order-card'])}>Заказать</ProductOrder>
					</ProductCardAbout>
					<ProductCardCharacteristics chars={product.characteristics}/>
				</div>
				
				
			</div>	
	);
}

export default ProductCard;