
import PageHead from '../../components/PageHead/PageHead';
import ServiceItem from '../../components/ServiceItem/ServiceItem';
import styles from './Service.module.css';
import { ServiceProps } from './Service.props';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';


function Service({className }: ServiceProps) {

	
	return (
		
		<section>
			<div className={cn(styles['service-page'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Услуги</title>
					</Helmet>
				</HelmetProvider>
				<PageHead>Услуги</PageHead>
                
				<div className={cn(styles['services'])} >
                
					<div className={cn(styles['service'])}>
						<ServiceItem className={cn(styles['service-item1'])}>
							<img src="/service/service1.png" alt="Подбор" />
							<span>Подбор</span>
						</ServiceItem>
						<p className={cn(styles['service-text'])}>
              Профессионально подберем товары, чтобы вы могли сэкономить время и
              получить именно то, что вам нужно. Проанализируем ваши потребности
              и предпочтения.
						</p>
					</div>

					<div className={cn(styles['service'])}>
						<ServiceItem className={cn(styles['service-item2'])}>
							<img src="/service/service2.png" alt="Замеры" />
							<span>Замеры</span>
						</ServiceItem>
						<p className={cn(styles['service-text'])}>
              Замер предоставляет точные и подробные данные, необходимые для
              успешного выполнения заказа Благодаря нашим опытным специалистам и
              использованию современного оборудования, мы гарантируем высокую
              точность и надежность.
						</p>
					</div>

					<div className={cn(styles['service'])}>
						<ServiceItem className={cn(styles['service-item3'])}>
							<img src="/service/service3.png" alt="Продажа" />
							<span>Продажа</span>
						</ServiceItem>
						<p className={cn(styles['service-text'])}>
              Продажа товаров и услуг, которые помогут вам эффективно
              реализовать вашу мечту и достичь максимальных результатов. Наши
              специалисты имеют обширный опыт в области продаж, что позволяет
              нам предоставлять высококачественные и результативные решения.
						</p>
					</div>

					<div className={cn(styles['service'])}>
						<ServiceItem className={cn(styles['service-item4'])}>
							<img src="/service/service4.png" alt="Установка" />
							<span>Установка</span>
						</ServiceItem>
						<p className={cn(styles['service-text'])}>
              Предоставляем комплексные услуги по установке различных товаров,
              обеспечивая профессиональный подход и высокое качество выполнения
              работ. Наши опытные специалисты гарантируют надежную установку в
              соответствии с вашими потребностями.
						</p>
					</div>
        
				</div>
				
				
			</div>
		</section>
	
	);

}

export default Service;