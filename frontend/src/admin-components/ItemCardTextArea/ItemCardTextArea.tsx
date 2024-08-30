import styles from './ItemCardTextArea.module.css';
import { ItemCardTextAreaProps } from './ItemCardTextArea.props';
import cn from 'classnames';
import 'react-quill-new/dist/quill.snow.css';
import './textAreaStyles.css';

import { useRef } from 'react';
import ReactQuill from 'react-quill-new';

function ItemCardTextArea({ className, content, onChangeContent, errors }: ItemCardTextAreaProps) {
    
	const quillRef = useRef(null);

	return (
		<div className={cn(styles['card-textarea'], {
			[styles['errors']]: errors
		}, className)}>
			<ReactQuill
				modules={{
					toolbar: [
						[{ header: [1, 2, 3, false] }],
						['bold', 'italic', 'underline'],
						[{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}]
					]
				}}
				formats={[
					'header',
					'bold', 'italic', 'underline',
					'list', 'indent'					
				]}

                
				value={content}
				onChange={onChangeContent}
				ref={quillRef}
				className={cn(styles['edit-area'])}
                
			/>
			
		
		</div>
		
           
	);

}

export default ItemCardTextArea;