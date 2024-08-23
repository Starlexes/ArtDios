
import PageHead from '../../components/PageHead/PageHead';
import styles from './About.module.css';
import { AboutProps } from './About.props';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';


function About({className }: AboutProps) {

	
	return (
		
		<section>
			<div className={cn(styles['about-page'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>О компании</title>
					</Helmet>
				</HelmetProvider>
				<PageHead>О компании</PageHead>
                
				<div className={cn(styles['about-content'])} >
					<div className={cn(styles['content-item'])}>
						<div className={cn(styles['logo-item'])}>
							<img src="/artdios-logo.png" alt="Лого АРТДИОС" />
							<p>
                                — это оптово-розничная компания с
                                одним из самых крупных складов в России. 
							</p>
						</div>
 
					</div>

					<div className={cn(styles['content-item'])}>
						<h3 className={cn(styles['item-title'])}>Наши преимущества:</h3>

						<ul className={cn(styles['item-list'])}>
							<li>Большие объемы реализуемой продукции</li>
							<li>Особые условия от поставщиков</li>
							<li>Продажа товаров по цене производителя</li>
							<li>Большой выбор товаров</li>
							<li>Квалифицированные сотрудники
							</li>
							<li>Собственная служба контроля оценинки качества работы менеджеров
							</li>
							<li>Собственные центры логистики</li>
						</ul>
					</div>

					<div className={cn(styles['content-item'])}>
						<img src="/about/about1.png" alt="Преимущества фото" />
					</div>

					<div className={cn(styles['content-item'])}>
						<h3 className={cn(styles['item-title'])}>Собственный склад</h3>

						<p>
                            Почти всю представленную продукцию в нашем магазине мы держим
                            в наличии, это позволяет нам осуществлять оперативную отгрузку товара.
                            Любой клиент может приехать и забрать продукцию со склада быстро и 
                            без лишних хлопот.
						</p>

						<img src="/about/about2.png" alt="Собственный склад фото" />
					</div>

					<div className={cn(styles['content-item'])}>
						<h3 className={cn(styles['item-title'])}>Выставочный залы</h3>

						<p>
                            Для удобства мы организовали просторные выставочные залы,
                            где можно увидеть и потрогать почти весь ассортимент дверей.
						</p>

						<img src="/about/about3.png" alt="Выставочный залы фото" />

						<p>
                            В нашем магазине очень большой выбор кварц-виниловой плитки
                            . Наши консультанты помогут правильно подобрать материалы.
						</p>

						<img src="/about/about4.png" alt="Выставочный залы кварц-винил" />

						<p>
                            У нас индивидуальный подход ко всем клиентам. Наши профессионалы быстро,
                            качественно помогут найти необходимый товар и уточнить все нюансы.
                            В нашем каталоге вы найдете современные и актуальные товары!
						</p>

					</div>
				</div>
				
				
			</div>
		</section>
	
	);

}

export default About;