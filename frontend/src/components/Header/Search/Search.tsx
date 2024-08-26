
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import cn from 'classnames';
import SearchSuggestionsItem from '../SearchSuggestionsItem/SearchSuggestionsItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { catalog, mediaImagesPath, seachingRoute } from '../../../utils/constants';

export interface Suggestion {
	name: string,
	slug: string
} 

function Search({className}: SearchProps) {

	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [suggestsActive, setSuggestsActive] = useState<boolean>(false);
	const [overSuggests, setOverSuggests] = useState<boolean>(false);

	const navigate = useNavigate();

	const fetchSuggestions = async (query: string) => {
		if (!query) return;
		
		try {
			const response = await axios.get(`/api/suggestions?query=${query}`);
			setSuggestions(response.data);
		
		} catch (error) {
			console.error('Ошибка при загрузке предложений:', error);
		}
	};

	const onClickLink = (value:string) => {
		setInputValue(value);
		setSuggestsActive(false);
	};

	const onClickSearch = () => {
		if (inputValue) {
			navigate(`${catalog}${seachingRoute}?s=${inputValue}`);
			setSuggestsActive(false);
		}
	};

	const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onClickSearch();
		}
	};

	const onMouseEnter = () => {
		setOverSuggests(true);
	};

	const onMouseLeave = () => {
		setOverSuggests(false);
	};

	const highlightText = (text: string) => {
		if (!inputValue) return text;
		const regex = new RegExp(`(${inputValue})`, 'gi');
		const parts = text.split(regex);
		return parts.map((part, index) => 
			regex.test(part) ? <span key={index} className={cn(styles['matches'])}>{part}</span> : part
		);
	};

	useEffect(() => {
		if (inputValue)  {
			fetchSuggestions(inputValue);
		} else {
			setSuggestsActive(false);
			setSuggestions([]);
		}
	}, [inputValue]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSuggestsActive(true);
		setInputValue(value);
	};

	const onFocus = () => {
		setSuggestsActive(true);
	};

	const onBlur = () => {
		if (overSuggests) {
			setTimeout(() => setSuggestsActive(false), 100);
		} else {
			setSuggestsActive(false);
		}
		
	};

	return (
		<div className={cn(styles['search'], className)} onKeyDown={onKeyDown}>
			<Input placeholder='Поиск' className={cn(styles['search-input'])}
				onChange={handleChange} value={inputValue} onFocus={onFocus}
				onBlur={onBlur}/>
			<Button className={cn(styles['search-btn'])} onClick={onClickSearch}>
				<img src={mediaImagesPath+'/other/loupe.svg'} alt="Иконка лупы"/>
			</Button>

			{suggestsActive && suggestions.length > 0 && inputValue && 
				<SearchSuggestions onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}> 
					{ suggestions.slice(0, 10).map(item => (
						<SearchSuggestionsItem key={item.slug} link={item.slug} onClickLink={onClickLink} suggestItem={item}>
							{highlightText(item.name)}
						</SearchSuggestionsItem>

					))
					}
				</SearchSuggestions>
			}
		</div>
			
		
	);
}

export default Search;