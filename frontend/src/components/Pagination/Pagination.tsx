import { nextDoublePage, nextSinglePage, prevDoublePage, prevSinglePage } from '../../utils/constants';
import NavItem from '../Header/NavItem/NavItem';
import styles from './Pagination.module.css';
import { PaginationProps } from './Pagination.props';
import cn from 'classnames';

function Pagination({url, currentPage, totalPages, className, params }: PaginationProps) {

	
	const pageText = () => {
		if (currentPage > totalPages) {
			return `${totalPages} из ${totalPages}`;
		}
		else if (currentPage < 1) {
			return `1 из ${totalPages}`;
		}
		else {
			return `${currentPage} из ${totalPages}`;
		}
	};

	const removeParam = ( param: string) => {
		const regex = new RegExp(`([?&])${param}=([^&]*)(&|$)`, 'i');
		return params
			.replace(regex, (_match, p1, _p2, p3) => p1 === '?' ? '?' : p3)
			.replace(/\?/, '');
	};

	const otherParams = removeParam('p')? '&'+removeParam('p'): '';

	return (
		<div className={cn(styles['pagination'], className)}>
			{
				currentPage !== 1 &&
                
				<div className={cn(styles['page-arrows'])}>
					<NavItem to={url+'?p=1'+otherParams}>
						<div className={cn(styles['page-arrow'])}>
						
							{prevDoublePage()}
					
						</div>
					</NavItem>
					
					<NavItem to={url+`?p=${currentPage-1}`+otherParams}>
						<div className={cn(styles['page-arrow'])}>
						
							{prevSinglePage()}
						
						</div>
					</NavItem>
				</div>
			}
           
			<span className={cn(styles['pagination-text'])}>
				{pageText()}
			</span>

			{currentPage < totalPages &&
                <div className={cn(styles['page-arrows'])}><NavItem to={url+`?p=${currentPage+1}`+otherParams}><div className={cn(styles['page-arrow'])}>{nextSinglePage()}</div></NavItem><NavItem to={url+`?p=${totalPages}`+otherParams}><div className={cn(styles['page-arrow'])}>{nextDoublePage()}</div></NavItem></div>
			}
		</div>
	);
}

export default Pagination;