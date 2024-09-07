import styles from './ModalForm.module.css';
import { ModalFormProps } from './ModalForm.props';
import cn from 'classnames';
import ModalInput from '../ModalInput/ModalInput';
import Button from '../../Header/Button/Button';
import ModalTextArea from '../ModalTextArea/ModalTextArea';
import NavItem from '../../Header/NavItem/NavItem';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { getCsrfToken } from '../../../utils/csrf';
import axiosInstance from '../../../utils/axiosInstance';
import { ErrorData } from '../ModalOrderCall/ModalOrderCall';
import { customContractRoute, opdPageRoute, publicOfferRoute } from '../../../utils/constants';


interface FormData {
	name: string,
	tel: string,
	email: string,
	comments: string,
	agreement: boolean
}



interface PostData {
	name: string,
	tel: string,
	email: string,
	comments: string,
}



function ModalForm({onClickClose, errors, setErrors, onSubmit, className, commentPlaceholder }: ModalFormProps) {

	const initialFormData: FormData =
	{
		name: '',
		tel: '',
		email: '',
		comments: commentPlaceholder? commentPlaceholder: '',
		agreement: false
	};

	const [formData, setFormData] = useState<FormData>(initialFormData);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

	useEffect(() => {
		getCsrfToken();
	}, []);

	const validate = (): ErrorData => {
		const newErrors: ErrorData = {};
		!formData.name? newErrors.name = 'Введите имя': newErrors.name = '';
		!formData.tel? newErrors.tel = 'Введите телефон': newErrors.tel = '';
		if(!formData.agreement) newErrors.agreement = true;
		return newErrors;
	};

	const handleInputPhone = (e: ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement; 

		if(target) {
			const value: string = target.value;
			target.value = value.replace(/[^0-9+ \-_()]/g, '');
		}
		
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, type, value } = e.target;	
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

		e.preventDefault();
		
		setIsSubmitAttempted(true);

		const newErrors = validate();

		

		if (!newErrors.name && !newErrors.tel && !newErrors.agreement) {
			setIsSubmitting(true);
			const {name, tel, email, comments} = formData;
			const postData: PostData = {
				name: name,
				tel: tel,
				email: email,
				comments: comments
			};
			

			try {
				await axiosInstance.post('/api/notify/send-telegram/', postData, {
					headers: {
						'Content-Type': 'application/json'
					}
				});
				setErrors({});
				setFormData(initialFormData) ;
				onSubmit && onSubmit(e);
				
			} catch (error) {
				console.error(error);
				
			} finally {
				setIsSubmitting(false);
				
			}
		} else {
			setErrors(newErrors);
		}
	};

	return (
		<form onSubmit={handleSubmit} className={cn(styles['modal-form'], className)}>
			
			
			<div className={cn(styles['form-inputs'])}>
				<label>
					{isSubmitAttempted && errors.name && <span className={cn(styles['error-msg'])}>{errors.name}</span>}	
					<ModalInput
						type="text"
						name="name"
						placeholder='Имя'
						onChange={handleChange}
						hasError={(isSubmitAttempted && errors.name) as boolean}
					/>
				</label>

				<label>
				
					{isSubmitAttempted && errors.tel && <span className={cn(styles['error-msg'])}>{errors.tel}</span>}	
					<ModalInput
						type="tel"
						name="tel"
						placeholder='Телефон'	
						onChange={handleChange}
						onInput={handleInputPhone}
						hasError={(isSubmitAttempted && errors.tel) as boolean}
					/>
				</label>

				<label>
					<ModalInput
						type="email"
						name="email"
						onChange={handleChange}
						placeholder='Почта'	
					/>	
				</label>

				<label>
					<ModalTextArea name='comments' onChange={handleChange} placeholder='Комментарии'
						value={formData.comments}/>
				</label>
			</div>

			<Button className={cn(styles['submit'])} disabled={isSubmitting} type="submit">Отправить</Button>

			<div className={cn(styles['checkbox-block'])}>
				<ModalInput checked={formData.agreement} name='agreement'
					type='checkbox'
					onChange={handleChange} hasError={(isSubmitAttempted && errors.agreement) as boolean}/>
				<label htmlFor='agreement'>
					<p>
					Согласие на<br/>
						<NavItem onClick={onClickClose} to={opdPageRoute} className={cn(styles['modal-label'])}>Обработку персональных данных</NavItem><br/>
						<NavItem onClick={onClickClose} to={customContractRoute} className={cn(styles['modal-label'])}>Пользовательское соглашение</NavItem><br/>			
						<NavItem onClick={onClickClose} to={publicOfferRoute} className={cn(styles['modal-label'])}>Публичная оферта</NavItem>	
					</p>			
				</label>
			</div>

			
		</form>
	);
}

export default ModalForm;