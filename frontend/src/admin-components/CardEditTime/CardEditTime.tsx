import { useEffect, useState } from 'react';
import ModelEditButton from '../ModelEditButton/ModelEditButton';
import styles from './CardEditTime.module.css';
import { CardEditTimeProps } from './CardEditTime.props';
import cn from 'classnames';
import ModelAcceptButton from '../ModelAcceptButton/ModelAcceptButton';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import './TimePickerStyles.css';

function CardEditTime({ className, newItem=false, hoursItem, onClickAccept, onClickAddItem}: CardEditTimeProps) {

	const [editClicked, setEditClicked] = useState<boolean>(false);
	const [acceptClicked, setAcceptClicked] = useState<boolean>(false);
	const [openHours, setOpenHours] = useState<string>(hoursItem? hoursItem.opening_hours: '');
	const [closeHours, setCloseHours] = useState<string>(hoursItem? hoursItem.closing_hours: '');
	const [isEmptyOpenHours, setIsEmptyOpenHours] = useState<boolean>(false);
	const [isEmptyCloseHours, setIsEmptyCloseHours] = useState<boolean>(false);

	const onClickEdit = () => {
		setEditClicked(!editClicked);
	};

	const onChangeOpenHour = (value: string | null) => {
		value && setOpenHours(value);
	};

	const onChangeCloseHour = (value: string | null) => {
		value && setCloseHours(value);
	};

	useEffect(() => {
		newItem && acceptClicked && closeHours && setIsEmptyCloseHours(false);
		newItem && acceptClicked && openHours && setIsEmptyOpenHours(false);
	}, [newItem, acceptClicked, openHours, closeHours]);

	return (

		<div className={cn(styles['time-edit'], className)}>
			
			<span className={cn(styles['time-text'])}>C</span>
			<div className={cn(styles['time-item'])}>
				{newItem || editClicked?
					<TimePicker value={openHours} format='HH:mm'
						onChange={onChangeOpenHour} disableClock={true} locale='ru-RU' clearIcon={null}
						className={cn(styles['time-picker'], {
							[styles['errors']]: isEmptyOpenHours
						})}/>
					: openHours.slice(0, 5)
				}
			</div>

			<span className={cn(styles['time-text'])}>ДО</span>

			<div className={cn(styles['time-item'])}>
				{newItem || editClicked?
					<TimePicker value={closeHours} format='HH:mm'
						onChange={onChangeCloseHour} disableClock={true} locale='ru-RU' clearIcon={null}
						className={cn(styles['time-picker'], {
							[styles['errors']]: isEmptyCloseHours
						})}/>
					: closeHours.slice(0, 5)
				}
			</div>

			{ 
				editClicked || newItem?		
					<ModelAcceptButton onClick={() => {
						setAcceptClicked(true);
						setEditClicked(false);
						openHours && closeHours && onClickAddItem &&
						onClickAddItem(openHours, closeHours);
						hoursItem && onClickAccept &&
						onClickAccept(hoursItem.id,
							openHours === hoursItem.opening_hours? undefined: openHours,
							closeHours === hoursItem.closing_hours? undefined: closeHours
						);
						newItem && !openHours && setIsEmptyOpenHours(true);
						newItem && !closeHours && setIsEmptyCloseHours(true);
					}} className={cn(styles['action'])}>
				Применить
					</ModelAcceptButton>
					:
					<ModelEditButton typeAction='main' onClick={onClickEdit}
						className={cn(styles['action'])}>
				Редактировать
					</ModelEditButton>
			}
				
		</div>	
	);

}

export default CardEditTime;