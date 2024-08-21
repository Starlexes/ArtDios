import { useState } from 'react';
import { catalog } from '../../../utils/constants';
import NavItem from '../NavItem/NavItem';
import styles from './SearchSuggestionsItem.module.css';
import { SearchSuggestionsItemProps } from './SearchSuggestionsItem.props';
import cn from 'classnames';
import { useMediaPredicate } from 'react-media-hook';

function SearchSuggestionsItem({onClickLink, children, className, link, suggestItem}: SearchSuggestionsItemProps) {

	const [isEntered, setIsEntered] = useState<boolean>(false);

	const matches = useMediaPredicate('(min-width: 881px)');

	const onMouseEnter = () => {
		setIsEntered(true);
	};

	const onMouseLeave = () => {
		setIsEntered(false);
	};

	return (
		<li>
			<NavItem to={catalog+link} onClick={() => onClickLink(suggestItem.name)}>
				<div className={cn(styles['suggest-item'], className)} onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}>
					<div className={cn(styles['suggest-category'])}>
						{children}
					</div>
					{(isEntered || !matches) &&
					<span className={cn(styles['link-catalog'])}>Перейти в каталог</span>
					}
				</div>
			</NavItem>
		</li>
	);
}

export default SearchSuggestionsItem;