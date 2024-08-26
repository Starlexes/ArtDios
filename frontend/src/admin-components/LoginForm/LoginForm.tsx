import axios, { AxiosError } from 'axios';
import Button from '../../components/Header/Button/Button';
import Input from '../../components/Header/Input/Input';
import { getCsrfToken } from '../../utils/csrf';
import styles from './LoginForm.module.css';
import { LoginFormProps } from './LoginForm.props';
import cn from 'classnames';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminHomeRoute, adminRoute } from '../../utils/constants';



function LoginForm({className }: LoginFormProps) {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isErrors, setIsErrors] = useState<boolean>(false);

	const navigate = useNavigate();


	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.post('/api/admin/login/', {
				username,
				password
			});
			const { access } = response.data;
			localStorage.setItem('access_token', access);
			navigate(`${adminRoute}${adminHomeRoute}`);
		} catch (error) {
			setIsErrors(true);
			if (error instanceof AxiosError) {
				console.error('Error logging in:', error.message);
			}
		}
	};

	useEffect(() => {
		getCsrfToken();
	}, []);

	return (
		<form onSubmit={handleSubmit} className={cn(styles['login-form'], className)}>
			
			<div className={cn(styles['form-title'])}>АВТОРИЗАЦИЯ НА САЙТЕ</div>

			<div className={cn(styles['form-inputs'])}>
				<Input className={cn(styles['form-input'], {
					[styles['errors']]: isErrors
				})} name='login'
				onChange={(e) => setUsername(e.target.value)}
				type='text' placeholder='Логин'/>
				<Input className={cn(styles['form-input'], {
					[styles['errors']]: isErrors
				})} name='password'
				onChange={(e) => setPassword(e.target.value)}
				type='password' placeholder='Пароль'/>
			</div>

			<Button className={cn(styles['submit-btn'])} type="submit">Войти</Button>

	
		</form>
	);
}

export default LoginForm;