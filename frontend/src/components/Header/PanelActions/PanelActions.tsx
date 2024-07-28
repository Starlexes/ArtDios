
import ButtonOrderCall from '../../ButtonOrderCall/ButtonOrderCall';
import Search from '../Search/Search';
import styles from './PanelActions.module.css';
import { PanelActionsProps } from './PanelActions.props';
import cn from 'classnames';

function PanelActions({className}: PanelActionsProps) {
	return (
		<div className={cn(styles['panel-actions'], className)}>
			<Search/>
			<ButtonOrderCall className='order-btn'>Заказать звонок</ButtonOrderCall>
		</div>
	);
}

export default PanelActions;