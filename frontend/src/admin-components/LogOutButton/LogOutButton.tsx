

import { useNavigate } from 'react-router-dom';
import Button from '../../components/Header/Button/Button';
import { deleteUser } from '../../utils/help-funcs';
import styles from './LogOutButton.module.css';
import {LogOutButtonProps} from './LogOutButton.props';
import cn from 'classnames';
import { adminLoginRoute, adminRoute } from '../../utils/constants';

function LogOutButton({className }: LogOutButtonProps) {
	const navigate = useNavigate();

	const onClick = () => {
		deleteUser();
		navigate(adminRoute+adminLoginRoute);
	};

	return (		
		<Button className={cn(styles['log-out'], className)} onClick={onClick}>
            Выйти
		</Button>
	);

}

export default LogOutButton;