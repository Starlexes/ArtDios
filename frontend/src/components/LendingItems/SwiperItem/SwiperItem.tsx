import { useMediaPredicate } from 'react-media-hook';
import { SwiperItemProps } from './SwiperItem.props';
import styles from './SwiperItem.module.css';
import { Swiper } from 'swiper/react';
import './SwiperItemStyles.css';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import cn from 'classnames';


function SwiperItem({children, className, sliderCount, betweenSlider, slidesPerView }: SwiperItemProps) {

	const phoneMatches = useMediaPredicate(`(min-width: ${sliderCount? sliderCount: 511}px)`);
	
	return (
	
		<Swiper
				
			slidesPerView={slidesPerView? slidesPerView: phoneMatches? 2: 1}
			spaceBetween={betweenSlider? betweenSlider: phoneMatches? 10: 20}
			pagination={{
				clickable: true
			}}
			navigation={{
				nextEl: '.next-btn',
				prevEl: '.prev-btn'
			}}
			modules={[Navigation]}
			className={cn(styles['swiper-item'], className) }
		>
              
			{children}
			<div className='next-btn swiper-button-next'><img src="/lending/right-arrow.svg" alt="Вправо"/></div>
			<div className='prev-btn swiper-button-prev'><img src="/lending/left-arrow.svg" alt="Влево"/></div>
		</Swiper>

	);

}

export default SwiperItem;