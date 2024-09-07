
import './ItemsSelector.css';
import { ItemsSelectorProps } from './ItemsSelector.props';
import Select, { GroupBase, OptionProps, SingleValue } from 'react-select';
import { adminSelectArrow } from '../../utils/constants';
import { OptionType } from '../../components/Filters/Media/SortingOrderMedia/SortingOrderMedia';


function ItemsSelector({ className, defaultOption,
	optionLabels, onChangeOption, selectErrors=false, small=false}: ItemsSelectorProps) {

	const defaultValue = {value: '', label: defaultOption};

	const options: OptionType[] = optionLabels.map( item => {
		return {value: String(item.id), label: item.name};
	});

	const onChange = (option: SingleValue<OptionType>) => {
		onChangeOption(option);
	};
    
	const CustomOption: React.FC<OptionProps<OptionType, false, GroupBase<OptionType>>> = (props) => {
		const { isFocused, innerRef, innerProps, data } = props;
		
		return (
			<div 
				ref={innerRef} 
				{...innerProps} 
				style={{ 
				
					backgroundColor: isFocused? '#BEBEBE': 'white', 
					padding: small? '10px 12px': '16px 26px',
					border: '1px solid',
					boxShadow: 'inset 0px 2px 10px 0px rgba(0, 0, 0, 0.25)',
					borderRadius: small? '0': '4px',
					height: small? '35px': '',
					display: 'flex',
					alignItems: 'center'
					
				}}
			>
				{data.label}
			</div>
		);
	};
	
	return (
		<Select
			defaultValue={defaultValue}
			options={options}
			className={`admin-select-order ${selectErrors? 'select-errors': ''} ${small? 'small': ''} ${className? className: ''}`}
			classNamePrefix='react-select'
			onChange={onChange}
			components={{DropdownIndicator: adminSelectArrow, Option: CustomOption}}			
		/>
	);
}

export default ItemsSelector;