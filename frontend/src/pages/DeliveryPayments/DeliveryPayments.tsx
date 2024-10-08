
import PageHead from '../../components/PageHead/PageHead';
import { mediaImagesPath } from '../../utils/constants';
import styles from './DeliveryPayments.module.css';
import { DeliveryPaymentsProps } from './DeliveryPayments.props';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';


function DeliveryPayments({className }: DeliveryPaymentsProps) {

	
	return (
		
		<section>
			<div className={cn(styles['delivery-page'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Доставка и оплата</title>
					</Helmet>
				</HelmetProvider>
				<PageHead>Доставка и оплата</PageHead>
                
				<div className={cn(styles['content-items'])} >
					<div className={cn(styles['content-item'])}>
						<h3 className={cn(styles['item-title'])}>Доставка</h3>
					
						<div className={cn(styles['item-info'])}>
							
							<div className={cn(styles['item-text'])}>
								<p>Стоимость <b>доставки</b> по  Севастополю 800 руб.</p>
								<p>
                      Услуги грузчика 750 руб (Донести до входной двери, если
                      машина с грузом припаркована в более чем в 100 метрах
                      от подъезда, дома. Подъем на этаж).
								</p>
							</div>
							<img src={mediaImagesPath+'/delivery-pays/delivery1.png'} alt="Скидка 5%" />
						</div>	
						<p>
                  Так же доставляем заказы по России. (Стоимость зависит
                  от отдаленности населенного пункта от Севастополя).
						</p>
						<p>
                  Доставка в регионы осуществляется Транспортными
                  Компаниями только по 100% предоплате.
						</p>

						<p>
                  Примечание: Согласно п.3 ст. 497 ГК РФ, в случае если Вы
                  отказываетесь от заказа в момент его фактического получения по
                  не зависящим от нашего Интернет-магазина причинам, Вы
                  оплачиваете стоимость доставки:
						</p>
					</div>
					
				

					<div className={cn(styles['content-item'])}>
						<h3 className={cn(styles['item-title'])}>Оплата</h3>
						
					
						<p><b>Способы оплаты:</b></p>
						<p>
							<b>Наличный расчет</b> – оплата наличными осуществляется в
                  центре продаж или по адресу клиента при оказании услуги
                  доставки.
						</p>
						<div className={cn(styles['item-info'])}>
							<div className={cn(styles['item-text'])}>
								<p>
                      Банковской картой - Клиент может выполнить оплату за товар
                      с помощью любой пластиковой карты с рублёвым счетом.
                      Данный метод доступен только для физических лиц, которые
                      являются собственниками карты.
								</p>
							</div>
							<img src={mediaImagesPath+'/delivery-pays/delivery2.png'} alt="Скидка 4%" />
						</div>
						<p>
							<b>Безналичный расчет</b> – этим способом может
                  воспользоваться как физическое, так и юридическое лицо. Для
                  оплаты по безналичному расчету нужно оформить заказ через
                  менеджера нашей компании, который выставит счет на оплату.
                   При получении продукции будут переданы все сопровождающие
                  документы.
						</p>

					</div>
						
				

					<div className={cn(styles['content-item'])} id='returning-product'>
						<h3 className={cn(styles['item-title'])}>Возврат товара</h3>
						
						<div className={cn(styles['item-text'])}>
							<p>
                  Если при покупке товара обнаружены недостатки, которые
                  продавец не оговорил, потребитель на основании ст. 18 Закона
                  РФ «О защите прав потребителей» №2300−1 от 07.02.1992 г.
                  (далее — Закон) имеет право по своему выбору потребовать:
							</p>
							<ul className={cn(styles['item-list'])}>
								<li>
                    замены на товар этой же марки (этих же модели и (или)
                    артикула);
								</li>
								<li>
                    замены на такой же товар другой марки (модели, артикула)
                    с соответствующим перерасчетом покупной цены;
								</li>
								<li>соразмерного уменьшения покупной цены;</li>
								<li>
                    незамедлительного безвозмездного устранения недостатков
                    товара или возмещения расходов на их исправление
                    потребителем или третьим лицом;
								</li>
							</ul>
							<p>
                  Если вы заказали двери по представленным продавцом образцам
                  покрытия, определенного размера, цвета, с определенным
                  рисунком. Дверь в таком случае будет
                  иметь индивидуально-определенные свойства , это означает, что
                  данный товар может использоваться только исключительно
                  приобретающим его потребителем! Товар надлежащего качества,
                  обладающий индивидуально-определенными свойствами вернуть или
                  обменять нельзя ! (п. 4 ст. 26.1 Закона). Примером такого
                  товара может служить дверь не входящая в стандартный перечень
                  товаров, выпускаемых производителем (дверь не стандартных
                  размеров, цвета, конструкции, изготовленная по эскизу,
                  согласованным между покупателем и продавцом, когда перечень
                  требований покупателя к критериям двери (размер, цвет,
                  рисунок, текстура) определен в договоре).
							</p>
							<p>
                  В случае, если в  товар, изготовленный на заказ, имеющий
                  индивидуально-определенные свойства, был передан
                  потребителю ненадлежащего качества , либо он не соответствует
                  договору (эскизу), то к данной ситуации применяются нормы ст.
                  29 Закона, которые устанавливают права потребителя при
                  обнаружении недостатков выполненной работы .
							</p>
							<p>
                  Требования, связанные с недостатками выполненной работы могут
                  быть предъявлены при принятии выполненной работы или в ходе
                  выполнения работы.
							</p>
						</div>
					</div>
				</div>
			</div>
											
		</section>
	
	);

}

export default DeliveryPayments;