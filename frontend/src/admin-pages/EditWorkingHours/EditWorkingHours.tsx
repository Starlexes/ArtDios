
import { useEffect, useState} from 'react';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import styles from './EditWorkingHours.module.css';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NewItemLayout from '../../admin-components/NewItemLayout/NewItemLayout';
import { EditWorkingHoursProps } from './EditWorkingHours.props';
import ItemCardInputArea from '../../admin-components/ItemCardInputArea/ItemCardInputArea';
import ItemCardInputLabel from '../../admin-components/ItemCardInputLabel/ItemCardInputLabel';
import { addWorkingHours, fetchWorkingHours, updateWorkingHours } from '../../slices/workingHours';
import CardEditTime from '../../admin-components/CardEditTime/CardEditTime';
import AddItemButton from '../../admin-components/AddItemButton/AddItemButton';
import { addItemPlus } from '../../utils/constants';


function EditWorkingHours({className }: EditWorkingHoursProps) {

	const {isLoading, workingHours} = useAppSelector((state: RootState) => state.workingHours);
	const [newItemClicked, setNewItemClicked] = useState<boolean>(false);
	
	const dispatch = useAppDispatch();

	const onClickAccept = (id?: number, openHours?: string , closeHours?: string) => {
		if (id && (openHours || closeHours)) {
			dispatch(updateWorkingHours({id: id, data: {
				...(openHours && { opening_hours: openHours }), 
				...(closeHours && { closing_hours: closeHours })
			}}));		
		}
	};

	const onClickAddItem = (openHours: string, closeHours: string) => {
		dispatch(addWorkingHours({opening_hours: openHours,
			closing_hours: closeHours
		}));
		setNewItemClicked(false);
	};

	useEffect(() => {
		if (workingHours.length === 0) {
			dispatch(fetchWorkingHours());
		}
	}, [dispatch, workingHours.length]);

	return (
		
		<section>
			<div className={cn(styles['hours-items'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Время работы</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Время работы
				</AdminPageHead>

				<NewItemLayout>
					
					{isLoading? <Spinner/> :
																				
						<ItemCardInputArea>
							<ItemCardInputLabel>Время работы:</ItemCardInputLabel>

							{workingHours.length > 0?  
								<CardEditTime onClickAccept={onClickAccept} hoursItem={workingHours[0]}/>	
							
								: newItemClicked? 
									<CardEditTime onClickAddItem={onClickAddItem} newItem={true}/>	
									:
									<AddItemButton shape='circle' className={cn(styles['action-btn'])}
										onClick={() => setNewItemClicked(!newItemClicked)}>
										{addItemPlus()}
									</AddItemButton>
							}			
							

						
						</ItemCardInputArea>																						
						
					}
				</NewItemLayout>								
			</div>
		</section>
	
	);

}

export default EditWorkingHours;

