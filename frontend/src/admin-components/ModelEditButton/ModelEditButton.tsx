
import Button from '../../components/Header/Button/Button';
import styles from './ModelEditButton.module.css';
import { ModelEditButtonProps } from './ModelEditButton.props';
import cn from 'classnames';



function ModelEditButton({ className, children, typeAction, ...props}: ModelEditButtonProps) {

	return (
		
		<Button className={cn(styles['edit-btn'], {
			[styles['main']]: typeAction === 'main',
			[styles['delete']]: typeAction === 'delete'
		}, className)} {...props}>
		
			{children}
		
		</Button>
           
	);

}

export default ModelEditButton;