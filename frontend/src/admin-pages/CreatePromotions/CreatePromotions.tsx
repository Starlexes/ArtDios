
import { ChangeEvent, useEffect, useState} from 'react';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import styles from './CreatePromotions.module.css';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import NewItemLayout from '../../admin-components/NewItemLayout/NewItemLayout';
import { CreatePromotionsProps } from './CreatePromotions.props';
import ItemImagePreview from '../../admin-components/ItemImagePreview/ItemImagePreview';
import SaveDeleteButton from '../../admin-components/SaveDeleteButton/SaveDeleteButton';
import { adminEditCategoryMenuRoute, adminEditPromotions, adminHomeRoute, adminRoute } from '../../utils/constants';
import ItemCardTitle from '../../admin-components/ItemCardTitle/ItemCardTitle';
import { addPromotion, fetchPromotion } from '../../slices/promotionSlice';
import ItemCardInputArea from '../../admin-components/ItemCardInputArea/ItemCardInputArea';
import ItemCardInputLabel from '../../admin-components/ItemCardInputLabel/ItemCardInputLabel';
import ItemCardInput from '../../admin-components/ItemCardInput/ItemCardInput';
import ItemCardTextArea from '../../admin-components/ItemCardTextArea/ItemCardTextArea';


function CreatePromotions({className }: CreatePromotionsProps) {

	const {isLoading, promo} = useAppSelector((state: RootState) => state.promotions );
	const [image, setImage] = useState<File | null>(null);
	const [secondImage, setSecondImage] = useState<File | null>(null);
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [acceptClicked, setAcceptClicked] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (promo.length === 0) {
			dispatch(fetchPromotion());
		}
	}, [dispatch, promo.length]);

	const isEmptyDesc = (content: string) => {
		const text = content.replace(/<[^>]*>/g, '').trim();
		return text === '';
	};


	const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
		}
	};

	const onChangeSecondImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSecondImage(file);
		}
	};

	const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onClickSubmit = () => {
		setAcceptClicked(true);
		if (image && secondImage && name && !isEmptyDesc(description)) {
			const formData = new FormData();
			formData.append('main_image', image);
			formData.append('second_image', secondImage);
			formData.append('name', name);
			formData.append('description', description);
			formData.append('is_show', 'false');
			dispatch(addPromotion(formData));
			navigate(adminRoute+adminHomeRoute+adminEditPromotions+adminEditCategoryMenuRoute);
		}

	};
			
	return (
		
		<section>
			<div className={cn(styles['promo-products'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Новая акция</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Новая акция
				</AdminPageHead>

				<NewItemLayout>
					<ItemCardTitle>
						Превью
					</ItemCardTitle>
					{isLoading? <Spinner/> :
						<>
							<div className={cn(styles['product-items'], styles['border-item'])}>
								<ItemCardInputArea className={cn(styles['promo-area'])}>
									<ItemCardInputLabel>Название:</ItemCardInputLabel>
									<ItemCardInput onChange={onChangeName} errors={acceptClicked && !name} placeholder='Название...'/>    			
								</ItemCardInputArea>
								
								<ItemImagePreview errors={acceptClicked && !secondImage} image={secondImage} onChange={onChangeSecondImage}/>
							</div>
							<ItemCardTitle>
						Карточка Акции
							</ItemCardTitle>
							<div className={cn(styles['product-items'])}>
								<ItemCardInputArea className={cn(styles['promo-area'], styles['promo-textarea'])}>
									<ItemCardInputLabel>Описание:</ItemCardInputLabel>
									<ItemCardTextArea content={description} onChangeContent={setDescription} errors={acceptClicked && isEmptyDesc(description)}/>    			
								</ItemCardInputArea>
								
								<ItemImagePreview errors={acceptClicked && !image} image={image} onChange={onChangeImage} className={cn(styles['main-preview'])}/>
							</div>
							<div className={cn(styles['action-btns'])}>
								<SaveDeleteButton typeAction='accept' onClick={onClickSubmit}/>
								
							</div>
							
						</>
					}
				</NewItemLayout>
				
			</div>
		</section>
	
	);

}

export default CreatePromotions;

