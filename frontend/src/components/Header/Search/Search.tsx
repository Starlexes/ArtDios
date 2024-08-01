
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import cn from 'classnames';

function Search({className}: SearchProps) {
	return (
		<div className={cn(styles['search'], className)}>
			<Input placeholder='Поиск' className={cn(styles['search-input'])}/>
			<Button className={cn(styles['search-btn'])}>
				<img src="/other/loupe.svg" alt="Иконка лупы"/>
			</Button>
		</div>
			
		
	);
}

export default Search;