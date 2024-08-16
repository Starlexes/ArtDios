import { useLocation, useNavigate } from 'react-router-dom';
import './SortingOrderMedia.css';
import { SortingOrderMediaProps } from './SortingOrderMedia.props';
import Select, { GroupBase, OptionProps, SingleValue} from 'react-select';
import { selectArrow } from '../../../../utils/constants';



interface OptionType {
    value: string;
    label: string;
}

const options: OptionType[] = [
	{value: '', label: 'Сортировка'},
	{ value: 'asc', label: 'Самые дешевые' },
	{ value: 'desc', label: 'Самые дорогие' }
];

function SortingOrderMedia({ className }: SortingOrderMediaProps) {

	const location = useLocation();
	const navigate = useNavigate();
	const url = location.pathname;
	const search = location.search.replace(/([&?])sort-by=[^&]*/g, '');

	const onChange = (option: SingleValue<OptionType>) => {
		
		if (option?.value === 'asc') {
			navigate(`${url}?${search? search+'&': ''}sort-by=asc`);
		} else {
			navigate(`${url}?${search? search+'&': ''}sort-by=desc`);
		}
	};

	const CustomOption: React.FC<OptionProps<OptionType, false, GroupBase<OptionType>>> = (props) => {
		const { isFocused, innerRef, innerProps, data } = props;
		
		return (
			<div 
				ref={innerRef} 
				{...innerProps} 
				style={{ 
					borderRadius: data.value==='asc' ? '10px 10px 0 0' : '0 0 10px 10px',
					backgroundColor: isFocused? '#d9d9d9': 'white', 
					padding: '7px 0',
					paddingLeft: '21px',
					display: !data.value? 'none': 'block'
				}}className={className}
			>
				{data.label}
			</div>
		);
	};
	
	return (
		<Select
			defaultValue={options[0]}
			options={options}
			className='select-order'
			classNamePrefix="react-select"
			onChange={onChange}
			isSearchable={false}
			components={{DropdownIndicator: selectArrow, Option: CustomOption}}
		/>
		
	);
}

export default SortingOrderMedia;