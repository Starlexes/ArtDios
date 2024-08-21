import styles from './SearchSuggestions.module.css';
import { SearchSuggestionsProps } from './SearchSuggestions.props';
import cn from 'classnames';

function SearchSuggestions({children, className, ...props}: SearchSuggestionsProps) {
	return (
		<div className={cn(styles['suggestions'], className)} {...props}>
			<nav>
				<ul>
					{children}
				</ul>
			</nav>
		</div>
			
	);
}

export default SearchSuggestions;