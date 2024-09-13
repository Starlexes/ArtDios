
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import cn from 'classnames';
import SearchSuggestionsItem from '../SearchSuggestionsItem/SearchSuggestionsItem';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { adminEditCatalog, adminEditCategoryMenuRoute, adminHomeRoute, adminRoute, catalog, mediaImagesPath, seachingRoute } from '../../../utils/constants';

export interface Suggestion {
	name: string,
	slug: string
} 


function Search({className, isAdmin=false}: SearchProps) {

	const [inputValue, setInputValue] = useState('');
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [suggestsActive, setSuggestsActive] = useState<boolean>(false);

	const navigate = useNavigate();

	const location = useLocation();

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
	};

	const onClickSearch = () => {
		if (inputValue) {
			isAdmin? navigate(`${adminRoute+adminHomeRoute+adminEditCatalog+adminEditCategoryMenuRoute}?s=${inputValue}`)
				: navigate(`${catalog}${seachingRoute}?s=${inputValue}`);
			setSuggestsActive(false);
		}
	};

	const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onClickSearch();
		}
	};


	const highlightText = (text: string) => {
		if (!inputValue) return text;
		const regex = new RegExp(`(${inputValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
		const parts = text.split(regex);
		return parts.map((part, index) => 
			regex.test(part) ? <span key={index} className={cn(styles['matches'])}>{part}</span> : part
		);
	};

	useEffect(() => {
		if (!isAdmin) {
			if (inputValue)  {
				fetchSuggestions(inputValue);
			} else {
				setSuggestsActive(false);
				setSuggestions([]);
			}
		}
	}, [inputValue, isAdmin]);

	useEffect(() => {
		setSuggestsActive(false);
	}, [location.pathname]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSuggestsActive(true);
		setInputValue(value);
	};

	const onFocus = () => {
		setSuggestsActive(true);
	};


	return (
		<>
			<div className={cn(styles['search'], className)} onKeyDown={onKeyDown}>
				<Input placeholder='Поиск' className={cn(styles['search-input'])}
					onChange={handleChange} value={inputValue} onFocus={onFocus}
				/>
				<Button className={cn(styles['search-btn'])} onClick={onClickSearch}>
					<img src={mediaImagesPath+'/other/loupe.svg'} alt="Иконка лупы"/>
				</Button>

				{!isAdmin && suggestsActive && suggestions.length > 0 && inputValue &&
				<>
					<SearchSuggestions> 
						{ suggestions.slice(0, 10).map(item => (
							<SearchSuggestionsItem key={item.slug} link={item.slug} onClickLink={onClickLink} suggestItem={item}>
								{highlightText(item.name)}
							</SearchSuggestionsItem>

						))
						}
					</SearchSuggestions>

					
				</>
				}
			</div>
			{!isAdmin && suggestsActive && suggestions.length > 0 && inputValue &&
				<div className={cn(styles['search-overlay'])} onClick={() => setSuggestsActive(false)}></div>
			}
		</>
	);
}

export default Search;