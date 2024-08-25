
import PageHead from '../../components/PageHead/PageHead';
import styles from './PublicOffer.module.css';
import { PublicOfferProps } from './PublicOffer.props';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';


function PublicOffer({className }: PublicOfferProps) {

	return (
		<section>
			<div className={cn(styles['offer-page'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Публичная оферта</title>
					</Helmet>
				</HelmetProvider>
				<PageHead>Публичная оферта</PageHead>
				<div className={cn(styles['offer-text'])}>
					<p>
                    Интернет-магазин «АРТДИОС», расположенный на доменном имени www.artdios.ru,
                    публикует Публичную оферту о продаже Товара дистанционным способом.<br/> Продавец — 
                    ИП Десятник Артем Владимирович, юридический адрес: 299059, г. Севастополь, ул. Маячная,
                    д. 33, кв. 139, ОГРНИП 323920000017651, ИНН 920003407842.
					</p>

					<ol className={cn(styles['offer-list'])}>
						<li>
							<span className={cn(styles['offer-title'])}>ОПРЕДЕЛЕНИЕ ТЕРМИНОВ</span>
							<p>
                  1.1. Публичная оферта (далее – «Оферта») - публичное
                  предложение Продавца, адресованное неопределенному кругу лиц,
                  заключить с Продавцом договор купли-продажи товара
                  дистанционным способом (далее - «Договор») на условиях,
                  содержащихся в настоящей Оферте, включая все Приложения.
							</p>
							<p>
                  1.2. Заказ Товара на сайте Интернет-магазина – позиции
                  указанные Покупателем из ассортимента Товара, предложенного к
                  продаже, при оформлении заявки на приобретение Товара на сайте
                  Интернет-магазина или через Оператора.
							</p>
							<p>
                                1.3. Товар — объект каталога Интернет-магазина «АРТДИОС»,
                                предназначенный для продажи любым лицам с целью личного пользования,
                                не связанного с предпринимательской деятельностью.
							</p>

							<p>
                                1.4. Покупатель — любое физическое или юридическое лицо,
                                предоставившее о себе Продавцу контактную и индивидуальную информацию
                                (имя, адрес электронный почты, контактный телефон),
                                которая может быть использована для оформления Заказа.
                                Данная информация может быть предоставлена во время оформления Заказа по телефону,
                                письмом на электронную почту Продавца.
							</p>

							<p>
                                1.5. Заказ — оформленный запрос Покупателя на покупку и доставку
                                товара, выбранного в Интернет-магазине «АРТДИОС».
							</p>
						</li>
						<li>							
							<span className={cn(styles['offer-title'])}>ОБЩИЕ ПОЛОЖЕНИЯ</span>
							<p>
                  2.1. Заказ Покупателем Товара, размещенного на сайте
                  Интернет-магазина означает, что Покупатель согласен со всеми
                  условиями настоящей Оферты.
							</p>
							<p>
                  2.2. Администрация сайта Интернет-магазина имеет право вносить
                  изменения в Оферту без уведомления Покупателя.
							</p>
							<p>
                  2.3. Срок действия Оферты не ограничен, если иное не указано
                  на сайте Интернет-магазина.
							</p>
							<p>
                  2.4. Продавец предоставляет Покупателю полную и достоверную
                  информацию о Товаре, включая информацию об основных
                  потребительских свойствах Товара, месте изготовления, а также
                  информацию о гарантийном сроке и сроке годности Товара на
                  сайте Интернет магазина, в разделе название раздела.
							</p>
						</li>
						<li>
							<span className={cn(styles['offer-title'])}>ЦЕНА ТОВАРА</span>
							<ol>
								<p>
                    3.1. Цена на каждую позицию Товара указана на сайте
                    Интернет-магазина.
								</p>
								<p>
                    3.2. Продавец имеет право в одностороннем порядке изменить
                    цену на любую позицию Товара.
								</p>
                  3.3. В случае изменения цены на заказанный Товар Продавец
                  обязуется в течение количество дней проинформировать
                  Покупателя об изменении цены Товара.
								<p>
                    3.4. Покупатель вправе подтвердить либо аннулировать Заказ
                    на приобретение Товара, если цена изменена Продавцом после
                    оформления Заказа.
								</p>
								<p>
                    3.5. Изменение Продавцом цены на оплаченный Покупателем
                    Товар не допускается.
								</p>
								<p>
                    3.6. Продавец указывает стоимость доставки Товара на сайте
                    Интернет-магазина либо сообщает Покупателю при оформлении
                    заказа Оператором.
								</p>
								<p>
                    3.7. Обязательства Покупателя по оплате Товара считаются
                    исполненными с момента поступления Продавцом денежных
                    средств.
								</p>
								<p>
                    3.8. Расчеты между Продавцом и Покупателем за Товар
                    производятся способами, указанными на сайте
                    Интернет-магазина в разделе название раздела.
								</p>
							</ol>
						</li>

						<li>						
							<span className={cn(styles['offer-title'])}>ОФОРМЛЕНИЕ ЗАКАЗА</span>
							<ol>
								<p>
                                4.1. Заказ Товара осуществляется Покупателем  по телефону номер телефона
                                или через сервис сайта Интернет-магазина www.artdios.ru адрес раздела.

								</p>
								<p>
                    4.2. При регистрации на сайте Интернет-магазина Покупатель
                    обязуется предоставить следующую регистрационную информацию:
								</p>
                  4.2.1. фамилия, имя, отчество Покупателя или указанного им
                  лица (получателя);
								<p>
                    4.2.2. адрес, по которому следует доставить Товар (если
                    доставка до адреса Покупателя);
								</p>
								<p>4.2.3. адрес электронной почты;</p>
								<p>4.2.4. контактный телефон.</p>
								<p>
                    4.4. Если Продавцу необходима дополнительная информация, он
                    вправе запросить ее у Покупателя. В случае не предоставления
                    необходимой информации Покупателем, Продавец не несет
                    ответственности за выбранный Покупателем Товар.
								</p>
								<p>
                    4.5. При оформлении Заказа через Оператора (п. 4.1.
                    настоящей Оферты) Покупатель обязуется предоставить
                    информацию, указанную в п. 4.2. настоящей Оферты.
								</p>
								<p>
                    4.6. Принятие Покупателем условий настоящей Оферты
                    осуществляется посредством внесения Покупателем
                    соответствующих данных в регистрационную форму на сайте
                    Интернет-магазина или при оформлении Заказа через Оператора.
                    После оформления Заказа через Оператора данные о Покупателе
                    регистрируются в базе данных Продавца. Утвердив Заказ
                    выбранного Товара, Покупатель предоставляет Оператору
                    необходимую информацию в соответствии с порядком, указанном
                    в п. 4.2. настоящей Оферты.
								</p>
								<p>
                    4.7. Продавец не несет ответственности за содержание и
                    достоверность информации, предоставленной Покупателем при
                    оформлении Заказа.
								</p>
								<p>
                    4.8. Покупатель несет ответственность за достоверность
                    предоставленной информации при оформлении Заказа.
								</p>
								<p>
                    4.9.Договор купли-продажи дистанционным способом между
                    Продавцом и Покупателем считается заключенным с момента
                    выдачи Продавцом Покупателю кассового или товарного чека
                    либо иного документа, подтверждающего оплату Товара.
								</p>
							</ol>
						</li>

						<li>
							<span className={cn(styles['offer-title'])}>ДОСТАВКА И ПЕРЕДАЧА ТОВАРА ПОКУПАТЕЛЮ</span>
							<ol>
								<p>
                    5.1. Продавец оказывает Покупателю услуги по доставке Товара
                    одним из способов указанных на сайте Интернет-магазина.
								</p>
								<p>
                    5.2. Если Договор купли-продажи товара дистанционным
                    способом (далее – Договор) заключен с условием о доставке
                    Товара Покупателю, Продавец обязан в установленный Договором
                    срок доставить Товар в место, указанное Покупателем, а если
                    место доставки Товара Покупателем не указано, то по месту
                    его жительства или регистрации.
								</p>
                  5.3. Место доставки Товара Покупатель указывает при оформлении
                  Заказа на приобретение Товара.
								<p>
                    5.4. Срок доставки Товара Покупателю состоит из срока
                    обработки заказа и срока доставки.
								</p>
								<p>
                    5.5. Доставленный Товар передается Покупателю, а при
                    отсутствии Покупателя - любому лицу, предъявившему квитанцию
                    или иной документ, подтверждающий заключение Договора или
                    оформление доставки Товара.
								</p>
								<p>
                    5.6. В момент передачи Товара в обязательном порядке в
                    письменной форме Покупателю сообщаются сведения,
                    предусмотренные в Приложении № номер к Договору.
								</p>
								<p>
                    5.7. Информация о Товаре доводится до сведения Покупателя в
                    технической документации, прилагаемой к Товару, на
                    этикетках, путем нанесения маркировки или иным способом,
                    принятым для отдельных видов товаров.
								</p>
								<p>
                    5.8. Сведения об обязательном подтверждении соответствия
                    Товара представляются в порядке и способами, которые
                    установлены законодательством Российской Федерации о
                    техническом регулировании, и включают в себя сведения о
                    номере документа, подтверждающего такое соответствие, о
                    сроке его действия и об организации, его выдавшей.
								</p>
							</ol>
						</li>

						<li>
							<span className={cn(styles['offer-title'])}>РЕКВИЗИТЫ ПРОДАВЦА</span>
							<p>Продавец: Десятник Артем Владимирович
							</p>
							<p>Название организации: ИП Десятник Артем Владимирович
							</p>
							<p>телефон</p>						
							<p>Юридический адрес: 299059, г. Севастополь, ул. Маячная, д. 33, кв. 139
							</p>
							<p>Банковские реквизиты:</p>
							<p>К/с: 30101810335100000607;</p>
							<p>Бик: 043510607.
							</p>
						</li>
					</ol>

					<p>
              Внимательно ознакомьтесь с текстом публичной оферты, и если Вы не
              согласны с каким-либо пунктом оферты, Вы вправе отказаться от
              покупки Товаров, предоставляемых Продавцом, и не совершать
              действий, указанный в п. 2.1. настоящей Оферты.
					</p>

					<p>Согласен с договором.</p>
				</div>
			</div>
		</section>
	
	);

}

export default PublicOffer;