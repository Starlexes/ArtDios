
import Button from '../Button/Button';
import Input from '../Input/Input';
import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import cn from 'classnames';

function Search({className}: SearchProps) {
	return (
		<div className={cn(styles['search'], className)}>
			<Input placeholder='Поиск' className='search-input'/>
			<Button className='search-btn'>
				<img src="/other/loupe.svg" alt="Иконка лупы"/>
			</Button>
		</div>
			
		
	);
}

export default Search;