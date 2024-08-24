import { useMediaPredicate } from 'react-media-hook';
import styles from './SizeCartDoor.module.css';
import { SizeCartDoorProps } from './SizeCartDoor.props';
import { SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import cn from 'classnames';
import SizeCartDoorItem from '../SizeCartDoorItem/SizeCartDoorItem';
import SwiperItem from '../SwiperItem/SwiperItem';



function SizeCartDoor({ className }: SizeCartDoorProps) {

	const matches = useMediaPredicate('(min-width: 1200px)');

 
	return (
		matches? 
			<div className={cn(styles['size-cart-doors'], className)}>
				
				<SizeCartDoorItem>																
					<img src="/lending/size-door1.png" alt="Подбор"/>
					<span>Офисные двери</span>     				
				</SizeCartDoorItem>	
				
				<SizeCartDoorItem>																
					<img src="/lending/size-door2.png" alt="Подбор"/>
					<span>Двери для ванной и туалета</span>								
				</SizeCartDoorItem>	
						
				<SizeCartDoorItem>																
					<img src="/lending/size-door3.png" alt="Подбор"/>
					<span>Двери для кухни</span>					
				</SizeCartDoorItem>	
							
				<SizeCartDoorItem>																
					<img src="/lending/size-door4.png" alt="Подбор"/>
					<span>Двери для гардеробной</span>							
				</SizeCartDoorItem>	
						
				
			</div>
			:  <SwiperItem sliderCount={650} className={cn(styles['cart-slider'])}>
              
				<SwiperSlide style={{ width: '270px',  alignSelf:'center'}}>
					<SizeCartDoorItem>																
						<img src="/lending/size-door1.png" alt="Подбор"/>
						<span>Офисные двери</span>     				
					</SizeCartDoorItem>	
				</SwiperSlide>

				<SwiperSlide style={{ width: '270px', alignSelf:'center'}}>
					<SizeCartDoorItem>																
						<img src="/lending/size-door2.png" alt="Подбор"/>
						<span>Двери для ванной и туалета</span>								
					</SizeCartDoorItem>	
				</SwiperSlide>

				<SwiperSlide style={{ width: '270px', alignSelf:'center'}}>
					<SizeCartDoorItem>																
						<img src="/lending/size-door3.png" alt="Подбор"/>
						<span>Двери для кухни</span>					
					</SizeCartDoorItem>	
				</SwiperSlide>

				<SwiperSlide style={{ width: '270px', alignSelf:'center'}}>
					<SizeCartDoorItem>																
						<img src="/lending/size-door4.png" alt="Подбор"/>
						<span>Двери для гардеробной</span>							
					</SizeCartDoorItem>	
				</SwiperSlide>

			</SwiperItem>
	);

}

export default SizeCartDoor;