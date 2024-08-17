import styles from './ProductCardCharacteristics.module.css';
import cn from 'classnames';
import { ProductCardCharacteristicsProps } from './ProductCardCharacteristics.props';

function ProductCardCharacteristics({className, chars}:ProductCardCharacteristicsProps) {

	return (	
		<div className={cn(styles['chars-card'], className)}>
			<span className={cn(styles['chars-title'])}>Характеристики</span>
			<div className={cn(styles['char-items'])}>
				{
					chars.map((char, index) => (
						<div className={cn(styles['char-item'])} key={index}>
							<div className={cn(styles['char-property'])}>
								{char.name}
							</div>
							<div className={cn(styles['char-value'])}>
								{char.description}
							</div>
						</div>				
					)
					)
				}
			</div>
		</div>
		
	);
}

export default ProductCardCharacteristics;