import styles from './LendingBanner.module.css';
import { LendingBannerProps } from './LendingBanner.props';
import cn from 'classnames';


function LendingBanner({className }: LendingBannerProps) {
	
	return (
	
		<div className={cn(styles['lending-banner'], className)}>
			<img src="/lending/lending-banner.png" alt="АРТДИОС Баннер"/>
			<div className={cn(styles['banner-info'])}>
				<h1 className={cn(styles['banner-title'])}>АРТДИОС — это сочетание высокого качества и доступных цен</h1>
				<span className={cn(styles['banner-text'])}>Свежий подход к покупкам, кто не любит ждать</span>
			</div>
		</div>	

	);

}

export default LendingBanner;