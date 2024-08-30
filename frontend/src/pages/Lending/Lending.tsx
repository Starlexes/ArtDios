import styles from './Lending.module.css';
import { LendingProps } from './Lending.props';
import cn from 'classnames';
import { useAppSelector } from '../../hooks';
import { AppDispatch, RootState, selectFilteredCategory } from '../../store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategory } from '../../slices/categorySlice';
import LendingBanner from '../../components/LendingItems/LendingBanner/LendingBanner';
import PopularProducts from '../../components/PopularProductItems/PopularProducts/PopularProducts';
import { fetchPopProduct } from '../../slices/popularProductSlice';
import PromotionItems from '../../components/PromotionItems/PromotionItems/PromotionItems';
import { fetchPromotion } from '../../slices/promotionSlice';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Spinner from '../../components/Spinner/Spinner';
import NavItem from '../../components/Header/NavItem/NavItem';
import { mediaImagesPath, serviceRoute } from '../../utils/constants';
import ServiceItem from '../../components/ServiceItem/ServiceItem';
import LendingHeadTitle from '../../components/LendingItems/LendingHeadTitle/LendingHeadTitle';
import CartsDoor from '../../components/LendingItems/CartsDoor/CartsDoor';
import SizeCartDoor from '../../components/LendingItems/SizeCartDoor/SizeCartDoor';
import ProductCartsTitle from '../../components/LendingItems/ProductCartsTitle/ProductCartsTitle';
import ProductCartsItem from '../../components/LendingItems/ProductCartsItem/ProductCartsItem';
import { useMediaPredicate } from 'react-media-hook';
import SwiperItem from '../../components/LendingItems/SwiperItem/SwiperItem';
import ProductCarts from '../../components/LendingItems/ProductCarts/ProductCarts';
import { SwiperSlide } from 'swiper/react';


function Lending({className }: LendingProps) {
	const dispatch = useDispatch<AppDispatch>();
	
	const categories = useAppSelector((state: RootState) => selectFilteredCategory(state));
	const {popProducts, error: popularError, isLoading: isLoadingPop } = useAppSelector((state: RootState) => state.popProducts);
	const {promo, error: promoError, isLoading: isLoadingPromo} = useAppSelector((state: RootState) => state.promotions);

	
	const showPopProducts = popProducts.filter(product => product.is_show).slice(0, 3);
	const namesCategories = showPopProducts.map(product => {
		const category = categories.find(item => item.id === product.category);
		return category? category: null;
	});
	const showPromo = promo.filter(item => item.is_show).slice(0, 3);

	const matches = useMediaPredicate('(min-width: 1200px)');
	const phoneMatches = useMediaPredicate('(min-width: 311px)'); 


	useEffect(() => {
		if (!categories.length) {
			dispatch(fetchCategory());
		}
		if (!popProducts.length) {
			dispatch(fetchPopProduct());
		}
		if (!promo.length) {
			dispatch(fetchPromotion());
		}
	}, [dispatch, categories.length, popProducts.length, promo.length]);

	
	return (
		<div className={cn(styles['lending'], className)}>
			<HelmetProvider>
				<Helmet>
					<title>АРТДИОС</title>
				</Helmet>
			</HelmetProvider>
			<LendingBanner/>
			<div className={cn(styles['lending-items'])}>
				
				<div className={cn(styles['lending-head'])}> 
					{isLoadingPop? <Spinner/>: 
						
						showPopProducts.length && !popularError &&
									<section>
										<PopularProducts category={namesCategories} popProducts={showPopProducts}/>
									</section>							
					}
					
					<section>
						<div className={cn(styles['service-items'])}>
							<LendingHeadTitle>Услуги</LendingHeadTitle>
							<NavItem to={serviceRoute}>
								<div className={cn(styles['services'])}>
									<ServiceItem className={cn(styles['service-item'], styles['service1'])}>
										<img src={mediaImagesPath+'/service/service1.png'} alt="Подбор"/>
										<span>Подбор</span>
									</ServiceItem>
							
									<ServiceItem className={cn(styles['service-item'], styles['service2'])}>							
										<img src={mediaImagesPath+'/service/service2.png'} alt="Замеры" />
										<span>Замеры</span>			
									</ServiceItem>
						
						
									<ServiceItem className={cn(styles['service-item'], styles['service3'])}>								
										<img src={mediaImagesPath+'/service/service3.png'} alt="Продажа"/>
										<span>Продажа</span>                     
									</ServiceItem>
						
						
									<ServiceItem className={cn(styles['service-item'], styles['service4'])}>							
										<img src={mediaImagesPath+'/service/service4.png'} alt="Установка"/>
										<span>Установка</span>								
									</ServiceItem>												
								</div>
							</NavItem>
						</div>
					</section>

					{ isLoadingPromo? <Spinner/>: 
						showPromo.length && !promoError && 
								<section>
									<PromotionItems promotions={showPromo}/>	
								</section>
					}						
									
				</div>

				
				<section>
					<div className={cn(styles['product-types'])}>
						<div className={cn(styles['product-type'])}>
							<h2 className={cn(styles['title-product'])}>Виды межкомнатных дверей</h2>
						
							<div className={cn(styles['product-desc'], styles['door-desc'])}>
								<p>
							Межкомнатные двери различаются по типу открывания. <br/>
									<strong>Распашные</strong>. Распашной способ открывания считается наиболее стандартным. 
							Межкомнатные двери монтируются на петли, которые могут крепиться к любой стороне проема.
								</p>
							</div>
						
							<img src={mediaImagesPath+'/lending/image-door1.png'} alt="Распашные"/>
						</div>

						<div className={cn(styles['product-type'])}>
							<div className={cn(styles['product-desc'], styles['door-desc'])}>
								<p>
									<strong>Раздвижные</strong>.
								Раздвижной способ открывания створок очень актуален для квартир,
								в которых строго ограничено свободное пространство.
								</p>
						
							</div>
							<img src={mediaImagesPath+'/lending/image-door2.png'} alt="Раздвижные"/>
						</div>
						<div className={cn(styles['product-type'])}>
							<div className={cn(styles['product-desc'], styles['door-desc'])}>
								<p>
						
									<strong>Складные</strong>.
							Складные системы открывания удобны, выглядят стильно и современно. 
							Количество створок может быть разным. Они перемещаются по направляющим, складываясь как гармошка.
							В открытом положении располагаются параллельно друг другу и занимают мало места.
								</p>
						
							</div>
							<img src={mediaImagesPath+'/lending/image-door3.png'} alt="Раздвижные"/>
						</div>

						<CartsDoor/>

						<div className={cn(styles['double-door'])}>
							<div className={cn(styles['double-door-content'])}>
								<h3 className={cn(styles['title-second'])}>Двустворчатые межкомнатные двери</h3>
								<p>Секрет таких дверей состоит в том,
								что <br/>
								любая дверь из категории межкомнатных дверей является двустворчатой.</p>
								<p>Главный параметр, на который необходимо обратить внимание,
								это ширина проёма, у разных дверей она может отличаться.</p>
							</div>
							<div className={cn(styles['double-door-image'])}>
								<img src={mediaImagesPath+'/lending/double-door.png'} alt="Двустворчатые межкомнатные двери"/>
							</div>
						</div>

						<div className={cn(styles['product-type'])}>
							<h3 className={cn(styles['title-second'])}>Параметры межкомнатных дверей</h3>
							<div className={cn(styles['product-desc'], styles['door-desc'])}>
								<p>
							Межкомнатные двери подходят для различных по габаритам помещений,
								но иногда необходимо учитывать параметры строения и производить замеры.
								Например дверь для офисного помещения не всегда подойдет для ванной комнаты или гардеробной.
								</p>        
							</div>  
						</div>

						<div className={cn(styles['door-size'])}>
							<img src={mediaImagesPath+'/lending/ruler.png'} alt="Размеры дверей"/>
							<div className={cn(styles['door-size-content'])}>
								<h3 className={cn(styles['title-second'], styles['door-size-title'])}>Размеры дверей</h3>
								<p>Межкомнатные и входные двери подразделяют на две категории: 
								стандартных и нестандартных размеров. Стандартная параметры дверей в
								большинстве случаев закрывают все потребностей покупателей.
								Наш ассортимент товаров может предложить нестандартные межкомнатные двери различных
								размеров. 
								Иногда необходимо установить межкомнатные двери по высоте больше чем стандарные и наши
								специалисты смогут в качественно и в кратчайшие сроки выполнить данную задачу.
								</p>
							</div>

						</div>	

						<SizeCartDoor/>


						<ProductCarts>
							<ProductCartsTitle>Цвета межкомнатных дверей</ProductCartsTitle>
							{matches? 
								<div className={cn(styles['item-carts'])}>
								
									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/door-color1.png'} alt="Бежевый"/>
										<span>Бежевый</span>
									</ProductCartsItem>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/door-color2.png'} alt="Серый"/>
										<span>Серый</span>
									</ProductCartsItem>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/door-color3.png'} alt="Винный"/>
										<span>Винный</span>
									</ProductCartsItem>
							
									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/door-color4.png'} alt="Ваниль"/>
										<span>Ваниль</span>
									</ProductCartsItem>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/door-color5.png'} alt="Зеленый"/>
										<span>Зеленый</span>
									</ProductCartsItem>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/door-color6.png'} alt="Синий"/>
										<span>Синий</span>
									</ProductCartsItem>
								</div>
								:
								<SwiperItem slidesPerView={3} betweenSlider={phoneMatches? 30: 100} className={cn(styles['product-carts-swiper'])}>

									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/door-color1.png'} alt="Бежевый"/>
											<span>Бежевый</span>
										</ProductCartsItem>
									</SwiperSlide>
									
									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/door-color2.png'} alt="Серый"/>
											<span>Серый</span>
										</ProductCartsItem>
									</SwiperSlide>
									
									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/door-color3.png'} alt="Винный"/>
											<span>Винный</span>
										</ProductCartsItem>
									</SwiperSlide>

									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/door-color4.png'} alt="Ваниль"/>
											<span>Ваниль</span>
										</ProductCartsItem>
									</SwiperSlide>

									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/door-color5.png'} alt="Зеленый"/>
											<span>Зеленый</span>
										</ProductCartsItem>
									</SwiperSlide>

									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/door-color6.png'} alt="Синий"/>
											<span>Синий</span>
										</ProductCartsItem>
									</SwiperSlide>
								</SwiperItem>
							}
						</ProductCarts>
								

						
						<ProductCarts>
							<ProductCartsTitle>Материалы межкомнатных дверей</ProductCartsTitle>
							{matches? 
								<div className={cn(styles['item-carts'])}>
									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/door-matirial1.png'} alt="Двери 
							из ольхи"/>
										<span>Двери 
								из ольхи</span>
									</ProductCartsItem>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/door-matirial2.png'} alt="Двери 
							из бука"/>
										<span>Двери 
								из бука</span>
									</ProductCartsItem>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/door-matirial3.png'}alt="Двери 
							из дуба"/>
										<span>Двери 
								из дуба</span>
									</ProductCartsItem>
							
									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/door-matirial4.png'} alt="Двери 
							из экошпона"/>
										<span>Двери 
								из экошпона</span>
									</ProductCartsItem>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/door-matirial5.png'} alt="Двери 
							из сосны"/>
										<span>Двери 
								из сосны</span>
									</ProductCartsItem>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/door-matirial6.png'} alt="Двери 
							из алюминия"/>
										<span>Двери 
								из алюминия</span>
									</ProductCartsItem>
						
								</div>  
								:
								<SwiperItem slidesPerView={3} betweenSlider={phoneMatches? 30: 100} className={cn(styles['product-carts-swiper'])}>
									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/door-matirial1.png'} alt="Двери 
							из ольхи"/>
											<span>Двери 
								из ольхи</span>
										</ProductCartsItem>
									</SwiperSlide>

									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/door-matirial2.png'} alt="Двери 
							из бука"/>
											<span>Двери 
								из бука</span>
										</ProductCartsItem>
									</SwiperSlide>

									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/door-matirial3.png'} alt="Двери 
							из дуба"/>
											<span>Двери 
								из дуба</span>
										</ProductCartsItem>
									</SwiperSlide>

									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/door-matirial4.png'} alt="Двери 
							из экошпона"/>
											<span>Двери 
								из экошпона</span>
										</ProductCartsItem>
									</SwiperSlide>

									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/door-matirial5.png'} alt="Двери 
							из сосны"/>
											<span>Двери 
								из сосны</span>
										</ProductCartsItem>
									</SwiperSlide>

									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/door-matirial6.png'} alt="Двери 
							из алюминия"/>
											<span>Двери 
								из алюминия</span>
										</ProductCartsItem>
									</SwiperSlide>
								</SwiperItem>
							} 
						</ProductCarts>
					</div>
				</section>

				
				<section>
					<div className={cn(styles['product-types'])}>
						<div className={cn(styles['product-type'])}>
							<h2 className={cn(styles['title-product'])}>Виды входных дверей</h2>
							<div className={cn(styles['product-desc'], styles['door-desc'])}>
								<p>
									<b>Алюминиевые</b>.Такие модели используются в архитектурном дизайне 
									или при оформлении дома в стилях: модерн или хай-тэк. Ошибочно полагают, 
									что входные двери, выбранные из алюминия недостаточно прочные. Если технология сгибания профиля не подвергалась сбоям или деформации, — прослужит не один год. Такие входные двери на порядок дешевле и легче,
										а количество циклов открывания и закрывания не уступает моделям из стали.
								</p>
								
							</div>
							<img src={mediaImagesPath+'/lending/enter-door1.png'} alt="Распашные"/>
						</div>

						<div className={cn(styles['product-type'])}>
							<div className={cn(styles['product-desc'], styles['door-desc'])}>
								<p>
									<b>Деревянные</b>.Двери, выполненные из дерева, 
									выглядят богато и изысканно. При помощи современных технологий стало возможным 
									устранение всех недостатков во время изготовления входных дверей из дерева.
									Большинство таких входных дверей изготавливается из шпона: клена, липы, бука, 
									вишни и других разновидностей древесины.
									
									Существует современная технология в изготовлении входных 
									дверей — использование термодревесины, в основу входит дуб, вишня и орех.
									Моделям из термодревесины свойственно долговременное использование. 
									Выбор моделей из натурального дерева считается роскошью и
										отличается увеличенной стоимостью.
								</p>
							</div>
							<img src={mediaImagesPath+'/lending/enter-door2.png'} alt="Распашные"/>
						</div>

						<div className={cn(styles['product-type'])}>
							<div className={cn(styles['product-desc'], styles['door-desc'])}>
								<p>
									<b>Пластиковые</b>. Представленные модели отличаются разнообразием форм, размеров и стилистики. Конструкция пластиковых входных дверей надёжна,
									если при её производстве использовали качественный профиль
									и соблюдали технологию.
								Пластиковые двери компонуются с металлическими и алюминиевыми вставками,
								придающие прочности и надёжности модели. Эти входные двери рассчитан 
								на индивидуальный заказ и специфическое применение.
								</p>
							</div>

							<img src={mediaImagesPath+'/lending/enter-door3.png'} alt="Распашные"/>

						</div>
					</div>
				</section>

				<section>
					<div className={cn(styles['door-list'])}>
						<h3 className={cn(styles['title-second'], styles['door-list-title'])}>Какие бывают входные двери по назначению:</h3>
						<ul>
							<li>Противоударные. Входные двери с повышенными характеристиками уровня прочности.</li>
							<li>Пуленепробиваемые и противопожарные. Металлические двери, изготовленные из высокопрочных сплавов, прошедшие обработку укрепляющими составами.</li>
							<li>Герметичные. Такой вид двери не распространены в частном строительстве; подходятдля хозяйственного и технологического применения.</li>
							<li>Звукоизолирующие. Двери, поглощающие звук из внешней среды,не допускают проникновение шума в дом.</li>
						</ul>  
					</div>										
				</section>

				<section>
					<div className={cn(styles['product-types'])}>
						<div className={cn(styles['product-type'])}>
							<h2 className={cn(styles['title-product'])}>Виды напольных покрытий</h2>
							<h3 className={cn(styles['title-second'])}>Ламинат</h3>
							<div className={cn(styles['product-desc'], styles['floor-desc'])}>
								
								<p>								
									Ламинат изготавливаются не только в широком цветовом диапазоне и фактуре,
									а также разделяются по структурному исполнению. ламинат может иметь гладкую или шероховатую поверхность, быть матовым или глянцевым,
									а также в магазинах можно встретить покрытие со структурным тиснением и 3D-рисунком.<br/>
									Какой выбрать дизайн материала, зависит от предпочтений покупателя,
									а также от стиля в помещении, где планируется укладка пола.	
								</p>
							</div>

							<img src={mediaImagesPath+'/lending/floor1.png'} alt="Ламинат"/>
						</div>

						<div className={cn(styles['product-type'])}>
							<h3 className={cn(styles['title-second'])}>Стандартный ламинат для пола</h3>
							<div className={cn(styles['product-desc'], styles['floor-desc'])}>
								<p>
                                Напольные покрытия
								</p>
								<ul>
									<li>Ламинат</li>
									<li>Ламинат SPC</li>
									<li>Плинтус напольный</li>
									<li>Подложка</li>
								</ul>
								<p>
                                Изготавливается с фаской и без неё.
								</p>
								<ul>
									<li>Первый вариант как бы выделяет каждую доску на поверхности, 
                                    что даёт практически неотличимую имитацию паркетной доски.</li>
									<li>Ламинат без фаски образуют монолитный пол,
                                     который может имееть фактуру дерева или камня.</li>
                                
								</ul>
							</div>

							<img src={mediaImagesPath+'/lending/floor2.png'} alt="Ламинат SPC"/>
						</div>

						<ProductCarts>
							<ProductCartsTitle>Материалы ламината</ProductCartsTitle>
							{ matches?
								<div className={cn(styles['item-carts'])}>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/lam-matirial1.png'} alt="Венге"/>
										<span>Венге</span>
									</ProductCartsItem>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/lam-matirial2.png'} alt="Дуб светлый"/>
										<span>Дуб светлый</span>
									</ProductCartsItem>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/lam-matirial3.png'} alt="Ольха"/>
										<span>Ольха</span>
									</ProductCartsItem>
                            
									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/lam-matirial4.png'} alt="Вишня"/>
										<span>Вишня</span>
									</ProductCartsItem>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/lam-matirial5.png'} alt="Дуб"/>
										<span>Дуб</span>
									</ProductCartsItem>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/lam-matirial6.png'} alt="Орех"/>
										<span>Орех</span>
									</ProductCartsItem>                                                
								</div>
								:

								<SwiperItem slidesPerView={3} betweenSlider={phoneMatches? 30: 100} className={cn(styles['product-carts-swiper'])}>
									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/lam-matirial1.png'} alt="Венге"/>
											<span>Венге</span>
										</ProductCartsItem>
									</SwiperSlide>

									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem style={{ position: 'relative', marginTop: '22px'}}>
											<img src={mediaImagesPath+'/lending/lam-matirial2.png'} alt="Дуб светлый"/>
											<span>Дуб светлый</span>
										</ProductCartsItem>
									</SwiperSlide>

									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/lam-matirial3.png'} alt="Ольха"/>
											<span>Ольха</span>
										</ProductCartsItem>
									</SwiperSlide>
									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/lam-matirial4.png'} alt="Вишня"/>
											<span>Вишня</span>
										</ProductCartsItem>
									</SwiperSlide>
									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/lam-matirial5.png'} alt="Дуб"/>
											<span>Дуб</span>
										</ProductCartsItem>
									</SwiperSlide>
									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/lam-matirial6.png'} alt="Орех"/>
											<span>Орех</span>
										</ProductCartsItem>  
									</SwiperSlide>

								</SwiperItem>
							}  
						</ProductCarts> 

					</div>
				</section>
				
				<section>
					<div className={cn(styles['product-types'])}>
						<div className={cn(styles['product-type'])}>
							<h2 className={cn(styles['title-product'])}>Кварц-винил</h2>
							<div className={cn(styles['product-desc'], styles['floor-desc'])}>
								<p>
                                Кварцвиниловая плитка (или кварц-виниловый ламинат) — также многослойный материал, 
                                но с другим составом. В зависимости от уровня оснащенности завода 
                                и соблюдения экологических требований у 
                                разных производителей компоненты могут немного отличаться. 
                                Является самым инновационным, 
                                экологичным и долговечным напольным покрытием.
								</p>
							</div>

							<img src={mediaImagesPath+'/lending/Vinil1.png'} alt="Ламинат"/>
						</div>

						<div className={cn(styles['product-type'])}>
							<h3 className={cn(styles['title-second'])}>Преимущества кварц-винила</h3>
							<div className={cn(styles['product-desc'], styles['floor-desc'])}>
								<p>
                                Кварцвиниловый ламинат - безопасное экологичное напольное покрытие
								</p>
								<ul>
									<li>Прочный материал, который не загибается по краям.</li>
									<li>Хорошо сохраняет свою геометрию при длительной эксплуатации.</li>
									<li>Высокая пожароустойчивость. </li>
									<li>Кварцевый песок в составе кварцвиниловой плитки обеспечивает дополнительное армирование материалу. </li>
									<li>Высокая ударопрочность. Хорошо переносит механические нагрузки, не раскалывается при ударе или падении тяжелого предмета на пол</li>
									<li>Как и у ламината, у кварцвиниловой плитки достаточно много различных вариантов декора. </li>
								</ul>
								<p>
                                Изготавливается с фаской и без неё.
								</p>
								<ul>
									<li>Первый вариант как бы выделяет каждую доску на поверхности, 
                                    что даёт практически неотличимую имитацию паркетной доски.</li>
									<li>Ламинат без фаски образуют монолитный пол,
                                     который может имееть фактуру дерева или камня.</li>
                                
								</ul>
							</div>
							<img src={mediaImagesPath+'/lending/Vinil2.png'} alt="Ламинат SPC"/>

							<div className={cn(styles['product-desc'], styles['floor-desc'])}>
								<ul>
									<li>Антискользящие свойства. Кварц-виниловый ламинат имеет специальную текстуру препятствующую скольжению, что повышает безопасность для человека, 
                                        как для детей и пожилых людей, так и для домашних животных</li>
									<li>Антистатичная поверхность — не накапливаются статические электрические заряды.</li>
									<li>Обладает хорошей теплопроводностью и термостабильностью </li>
									<li>Антигрибковые и антибактериальные свойства. Данные свойства позволяют использовать это покрытие в медицинских учреждениях 
                                        и объектах здравоохранения </li>
									<li>Можно совмещать с системой теплого пола.</li>
								</ul>
							</div>

							<img src={mediaImagesPath+'/lending/Vinil3.png'} alt="Ламинат SPC2"/>
						</div>
					</div>
				</section>

				<section>
					<div className={cn(styles['product-types'])}>
						<div className={cn(styles['product-type'])}>
							<h2 className={cn(styles['title-product'])}>Натяжные потолки</h2>
							<div className={cn(styles['product-desc'], styles['roof-desc'])}>
								<p>
									<strong>Натяжной потолок</strong> — это специальное полотно из различных материалов.
								Его главное приемущество —
								возможность для натяжения под потолком и 
								закрепления с помощью специальных металлических или тканевых профилей.
								</p>
							</div>

							<div className={cn(styles['double-image'])}>
								<img src={mediaImagesPath+'/lending/roof2.png'} alt="Глянцевые натяжные потолки"/>
								<img src={mediaImagesPath+'/lending/roof3.png'} alt="Матовые натяжные потолки"/>
							</div>
						</div>

						<div className={cn(styles['product-type'])}>
							<h3 className={cn(styles['title-second'])}>Виды натяжных потолков</h3>
							<div className={cn(styles['product-desc'], styles['roof-desc'])}>
								<p> <strong>Глянцевые натяжные потолки</strong> имеют широкую цветовую гамму.
                                Отличительная характеристика — 
                                зеркальное отражение. Помещение визуально увеличивается при
                                использовании таких полотен. Недостатками глянцевых
                                натяжных потолков является более заметная на зеркальной
                                поверхности линия шва.
								</p>
								<br/>
								<p> На <strong>матовых натяжных потолках</strong> не бывает бликов и отблесков,
                                благодаря чему происходит точная цветопередача.
                                Матовое полотно отличается экологичностью,
                                оно не выделяет запах, токсичные вещества.
                                Еще одно весомое преимущество — 
                                это стойкость к механическому износу.
                                Однако грязь с матовой поверхности смывать несколько сложнее, чем с глянца.
								</p>
								<br/>
								<p> Главный плюс <strong>сатиновых натяжных потолков</strong> — 
                                это возможность монтажа многоуровневых потолочных конструкций.
                                Можно установить двухцветные потолки, создать интересные переходы,
                                ниши. Также стоит отметить пожаробезопасность этого потолка.
                                Сатиновый материал не горит и не выделяет опасные газы при высокой температуре. Но есть и недостаток —
                                монтировать такой потолок можно только в отапливаемых помещениях.  
								</p>
							</div>
							<img src={mediaImagesPath+'/lending/roof4.png'} alt="сатиновых натяжных потолков"/>
						</div>

						<ProductCarts>
							<ProductCartsTitle>Материалы изготовления натяжных потолков</ProductCartsTitle>
							{ matches? 
								<div className={cn(styles['item-carts'])}>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/lam-matirial1.png'} alt="Венге"/>
										<span>Венге</span>
									</ProductCartsItem>

									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/roof-matirial1.png'} alt="Тканевые"/>
										<span>Тканевые</span>
									</ProductCartsItem>
    
									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/roof-matirial2.png'} alt="Пленка из ПВХ"/>
										<span>Пленка из ПВХ</span>
									</ProductCartsItem>
    
									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/roof-matirial3.png'} alt="Матовые"/>
										<span>Матовые</span>
									</ProductCartsItem>
                                
									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/roof-matirial4.png'} alt="Текстурные"/>
										<span>Текстурные</span>
									</ProductCartsItem>
    
									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/roof-matirial5.png'} alt="Прозрачные"/>
										<span>Полупрозрачные</span>
									</ProductCartsItem>
    
									<ProductCartsItem>
										<img src={mediaImagesPath+'/lending/roof-matirial6.png'} alt="Сатиновые"/>
										<span>Сатиновые</span>
									</ProductCartsItem>                          
								</div>
								:
								<SwiperItem slidesPerView={3} betweenSlider={phoneMatches? 30: 100} className={cn(styles['product-carts-swiper'])}>
									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/lam-matirial1.png'} alt="Венге"/>
											<span>Венге</span>
										</ProductCartsItem>
									</SwiperSlide>

									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/roof-matirial1.png'} alt="Тканевые"/>
											<span>Тканевые</span>
										</ProductCartsItem>
									</SwiperSlide>
									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem style={{ position: 'relative', marginTop: '22px'}}>
											<img src={mediaImagesPath+'/lending/roof-matirial2.png'} alt="Пленка из ПВХ"/>
											<span>Пленка из ПВХ</span>
										</ProductCartsItem>
									</SwiperSlide>
									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/roof-matirial3.png'} alt="Матовые"/>
											<span>Матовые</span>
										</ProductCartsItem>
									</SwiperSlide>

									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/roof-matirial4.png'} alt="Текстурные"/>
											<span>Текстурные</span>
										</ProductCartsItem>
									</SwiperSlide>
									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem style={{position: 'relative', marginTop: '22px', wordBreak: 'break-all'}}>
											<img src={mediaImagesPath+'/lending/roof-matirial5.png'} alt="Прозрачные"/>
											<span>Полупрозрачные</span>
										</ProductCartsItem>
									</SwiperSlide>
									<SwiperSlide style={{ alignSelf:'center'}} className={cn(styles['product-items-slide'])}>
										<ProductCartsItem>
											<img src={mediaImagesPath+'/lending/roof-matirial6.png'} alt="Сатиновые"/>
											<span>Сатиновые</span>
										</ProductCartsItem> 
									</SwiperSlide>

								</SwiperItem>   
							}
						</ProductCarts>

						<div className={cn(styles['product-type'])}>
							<h3 className={cn(styles['title-second'])}>Преимущества натяжных потолков</h3>
							<div className={cn(styles['product-desc'], styles['roof-desc'])}>
								<p>Натяжной потолок,
                             благодаря разнообразию цветовой гаммы и фактуры,
                              отлично гармонирует с любым интерьером, дополняя дизайн и
                               создавая гармоничное пространство.
								</p>

								<p>Среди преимуществ натяжного потолка можно выделить следующее:</p>

								<ul>
									<li>Простота в уходе. Поверхность достаточно пару раз в 
                                год протирать мыльным раствором.
                                 Сегодня на рынке бытовой химии созданы целые линейки по уходу за глянцевыми,
                                 матовыми и иными поверхностями потолка.</li>
									<li>Не требует подготовки основной поверхности потолка 
                                (выравнивание, оштукатуривание, покраска и т.д.).</li>
									<li>Большой срок эксплуатации. </li>
									<li>Влагозащита. Полотно (за исключением некоторых тканевых потолков) 
                                не пропускает влагу.</li>
								</ul>
							</div>

							<div className={cn(styles['double-image'])}>
								<img src={mediaImagesPath+'/lending/roof5.png'} alt="Сумерки"/>
								<img src={mediaImagesPath+'/lending/roof6.png'} alt="День"/>
							</div>
						</div>
					</div>
				</section>

				<section>
					
					<div className={cn(styles['product-types'])}>
						<div className={cn(styles['product-type'])}>
							<h2 className={cn(styles['title-product'])}>Пластиковые окна</h2>
							<div className={cn(styles['product-desc'], styles['window-desc'])}>
								<p>
									<strong>Пластиковые окна</strong> — это конструкции с высокими характеристиками тепло- и звукоизоляции,
									в основе которых ПВХ-профиль. Оконная система дополняется стеклопакетом, 
									фурнитурой и уплотнителями.
									Окна ПВХ изготавливаются разных форм, размеров и конфигураций.
								</p>
							</div>

							<img src={mediaImagesPath+'/lending/window-image.png'} alt="Пластиковые окна" />
						</div>
						<div className={cn(styles['product-type'])}>
							<h3 className={cn(styles['title-second'])}>Характеристики пластиковых окон</h3>
							<div className={cn(styles['product-desc'], styles['window-desc'], styles['window-list'])} >
								<ol>
									<li>
										<strong>Теплоизоляция</strong>.
										Тепло из помещения уходит через оконные проемы и вентиляционные устройства.
										Эффективные оконные конструкции снижают теплопотери,
										что в итоге приводит к сокращению расходов на отопление 
										и сохранению тепла внутри помещения.
									</li>
									<li>
										<strong>Стекло</strong> — представляет собой уязвимую часть устройства окон.
									Высокую теплопроводность стекла компенсирует газовая прослойка между его
									слоями, образующая камеру стеклопакета. Использование инертного газа или
									воздуха в такой камере приводит к уменьшению скорости остывания стекла в несколько раз.
									</li>

									<li>
										<strong>Количество створок</strong> — один из ключевых параметров,
										определяющих функциональность окон, это количество распашных частей.
										Оно непосредственно зависит от размеров оконного проема.
										При планировании проекта рассматривается вопрос о том,
										будут ли эти части открываться или останутся неподвижными.
									</li>

									<li>
										<b>Различают по типу:</b>
										<ul>
											<li>Одностворчатые</li>
											<li>Двухстворчатые</li>
											<li>Трехстворчатые</li>
										</ul>
									</li>

									<li>
										<b>По типу типу механизма открывания створок: 
										</b>
										<ul>
											<li>Глухие</li>
											<li>Поворотные</li>
											<li>Откидные</li>
											<li>Поворотно-откидные</li>
											<li>Раздвижные</li>
										</ul>
									</li>

									<li>
										<b>Число камер в стеклопакете:
										</b>
										<ul>
											<li>Однокамерные</li>
											<li>Двухкамерные</li>
											<li>Трехкамерные</li>
										</ul>
									</li>

									<li>
										<strong>Надежность</strong>.
										Ответственность за надежность пластиковых окон лежит на их профиле и фурнитуре,
										что делает открытие или взлом рамы затруднительным. 
										Крепеж из стали обеспечивает закрытие окна, а профиль точно подогнан для 
										герметичного соединения створок, предотвращая проникновение ломков. 
									</li>
								</ol>

								
							</div>
						</div>
					</div>
					
				</section>
			</div>
		</div>
	
	);

}

export default Lending;