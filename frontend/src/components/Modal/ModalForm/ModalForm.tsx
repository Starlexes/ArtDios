

import styles from './ModalForm.module.css';
import { ModalFormProps } from './ModalForm.props';
import cn from 'classnames';
import ModalInput from '../ModalInput/ModalInput';
import Button from '../../Header/Button/Button';
import ModalTextArea from '../ModalTextArea/ModalTextArea';
import Input from '../../Header/Input/Input';
import NavItem from '../../Header/NavItem/NavItem';


function ModalForm({onSubmit, className }: ModalFormProps) {

	return (
		<form onSubmit={onSubmit} className={cn(styles['modal-form'], className)}>
			
				
			<div className={cn(styles['form-inputs'])}>
				<ModalInput
					type="text"
					name="name"
					placeholder='Имя'
				/>
				
			
				<ModalInput
					type="tel"
					name="tel"
					placeholder='Телефон'	
				/>

				<ModalInput
					type="email"
					name="email"
					placeholder='Почта'	
				/>	

				<ModalTextArea placeholder='Комментарии'/>
			</div>

			<Button className='submit' type="submit">Отправить</Button>

			<div className={cn(styles['checkbox-block'])}>
				<Input name='agreement' type='checkbox' className='modal-checkbox' />
				<label htmlFor='agreement'>
					<p>
					Согласие на<br/>
						<NavItem href='#' className='modal-label'>Обработку персональных данных</NavItem><br/>
						<NavItem href='#' className='modal-label'>Пользовательское соглашение</NavItem><br/>
					
						<NavItem href='#' className='modal-label'>Публичная оферта</NavItem>.		
					</p>			
				</label>
			</div>

			
		</form>
	);
}

export default ModalForm;