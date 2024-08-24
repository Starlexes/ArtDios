import { useMediaPredicate } from 'react-media-hook';
import styles from './CartsDoor.module.css';
import { CartsDoorProps } from './CartsDoor.props';
import { SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import cn from 'classnames';
import CartDoorItem from '../CartDoorItem/CartDoorItem';
import SwiperItem from '../SwiperItem/SwiperItem';


function CartsDoor({className }: CartsDoorProps) {

	const matches = useMediaPredicate('(min-width: 1200px)');
	const secondMatches = useMediaPredicate('(min-width: 740px)');
	const mobileMatches = useMediaPredicate('(min-width: 511px)');
	return (
		matches? 
			<div className={cn(styles['cart-doors'], className)}>
				
				<CartDoorItem>																
                    Межкомнатные двери купе							
				</CartDoorItem>	
				
				<CartDoorItem>																
				Межкомнатные двери складные								
				</CartDoorItem>	
						
				<CartDoorItem>																
				Межкомнатные двери гармошка					
				</CartDoorItem>	
							
				<CartDoorItem>																
				Межкомнатные скрытые двери							
				</CartDoorItem>	
						
				<CartDoorItem>																	
				Межкомнатные двери без краски							
				</CartDoorItem>	
				
			</div>
			:  <SwiperItem slidesPerView={!mobileMatches? 1: secondMatches? 3: 2} betweenSlider={!mobileMatches? 80: 0}>
              
				<SwiperSlide style={{ width: '200px',  alignSelf:'center'}}>
					<CartDoorItem>																
                    Межкомнатные двери купе							
					</CartDoorItem>	
				</SwiperSlide>

				<SwiperSlide style={{ width: '200px', alignSelf:'center'}}>
					<CartDoorItem>																
				Межкомнатные двери складные								
					</CartDoorItem>	
				</SwiperSlide>

				<SwiperSlide style={{ width: '200px', alignSelf:'center'}}>
					<CartDoorItem>																
				Межкомнатные двери гармошка					
					</CartDoorItem>	
				</SwiperSlide>

				<SwiperSlide style={{ width: '200px', alignSelf:'center'}}>
					<CartDoorItem>																
				Межкомнатные скрытые двери							
					</CartDoorItem>	
				</SwiperSlide>

				<SwiperSlide style={{ width: '200px', alignSelf:'center'}}>
					<CartDoorItem>																	
				Межкомнатные двери без краски							
					</CartDoorItem>	
				</SwiperSlide>
			</SwiperItem>

	);

}

export default CartsDoor;