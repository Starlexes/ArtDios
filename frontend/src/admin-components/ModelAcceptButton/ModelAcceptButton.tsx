
import ModelEditButton from '../ModelEditButton/ModelEditButton';
import styles from './ModelAcceptButton.module.css';
import { ModelAcceptButtonProps } from './ModelAcceptButton.props';
import cn from 'classnames';



function ModelAcceptButton({ className, children, ...props }: ModelAcceptButtonProps) {

	return (
		
		<ModelEditButton className={cn(styles['accept-btn'], className)} typeAction='main'
			{...props}>
		
			{children}
		
		</ModelEditButton>
           
	);

}

export default ModelAcceptButton;