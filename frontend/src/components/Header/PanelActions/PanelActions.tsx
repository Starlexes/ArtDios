
import Button from '../Button/Button';
import Search from '../Search/Search';
import styles from './PanelActions.module.css';
import { PanelActionsProps } from './PanelActions.props';
import cn from 'classnames';

function PanelActions({className}: PanelActionsProps) {
	return (
		<div className={cn(styles['panel-actions'], className)}>
			<Search/>
			<Button className='order-btn'>Заказать звонок</Button>
		</div>
	);
}

export default PanelActions;