
import { ChangeEvent, useEffect, useState} from 'react';
import AdminPageHead from '../../admin-components/AdminPageHead/AdminPageHead';
import Spinner from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import styles from './EditPromotionCard.module.css';
import cn from 'classnames';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import NewItemLayout from '../../admin-components/NewItemLayout/NewItemLayout';
import { EditPromotionCardProps } from './EditPromotionCard.props';
import ItemImagePreview from '../../admin-components/ItemImagePreview/ItemImagePreview';
import SaveDeleteButton from '../../admin-components/SaveDeleteButton/SaveDeleteButton';
import { adminEditCategoryMenuRoute, adminEditPromotions, adminHomeRoute, adminRoute } from '../../utils/constants';
import ModalAskDelete from '../../admin-components/ModalAskDelete/ModalAskDelete';
import ItemCardTitle from '../../admin-components/ItemCardTitle/ItemCardTitle';
import { deletePromotion, updatePromotion } from '../../slices/promotionSlice';
import ItemCardInputArea from '../../admin-components/ItemCardInputArea/ItemCardInputArea';
import ItemCardInputLabel from '../../admin-components/ItemCardInputLabel/ItemCardInputLabel';
import ItemCardTextArea from '../../admin-components/ItemCardTextArea/ItemCardTextArea';
import ItemCardInput from '../../admin-components/ItemCardInput/ItemCardInput';
import { fetchPromotionCard } from '../../slices/promotionCardSlice';


function EditPromotionCard({className }: EditPromotionCardProps) {

	const {isLoading, promotion} = useAppSelector((state: RootState) => state.promotionCard );
	
	const [image, setImage] = useState<File | null>(null);
	const [secondImage, setSecondImage] = useState<File | null>(null);
	const [name, setName] = useState<string>();
	const [description, setDescription] = useState<string>('');
	const [acceptClicked, setAcceptClicked] = useState<boolean>(false);

	const [currentPromo, setCurrentPromo] = useState<string>('');

	const [deleteClicked, setDeleteClicked] = useState<boolean>(false);
	
	const { promoItem: promoParam } = useParams<{ promoItem: string }>();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (currentPromo !== promoParam) {
			setCurrentPromo(promoParam as string);
			if (promoParam) {
				dispatch(fetchPromotionCard(promoParam));
			}
		}
	}, [dispatch, promoParam, currentPromo]);

	useEffect(() => {
		if (promotion.id) {
			setName(promotion.name);
			setDescription(promotion.description);
		}
	}, [promotion]);

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
		if (name && !isEmptyDesc(description)) {
			const formData = new FormData();
			image && formData.append('main_image', image);
			secondImage && formData.append('second_image', secondImage);
			name && formData.append('name', name);
			!isEmptyDesc(description) && formData.append('description', description);
			dispatch(updatePromotion({id: Number(promotion?.id), data: formData}));
			navigate(adminRoute+adminHomeRoute+adminEditPromotions+adminEditCategoryMenuRoute);
		}

	};

	const onClickDelete = () => {
		setDeleteClicked(!deleteClicked);	
	};

	const onDelete = (id?: number) => {
		if (id) {
			dispatch(deletePromotion(id));
			navigate(adminRoute+adminHomeRoute+adminEditPromotions+adminEditCategoryMenuRoute);
		}
	};

	return (
		
		<section>
			<div className={cn(styles['promo-card'], className)}>
				<HelmetProvider>
					<Helmet>
						<title>Акция</title>
					</Helmet>
				</HelmetProvider>
				<AdminPageHead>
                    Акция
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
									<ItemCardInput onChange={onChangeName} errors={acceptClicked && !name} placeholder='Название...' value={name}/>    			
								</ItemCardInputArea>
								
								<ItemImagePreview image={secondImage? secondImage: promotion.second_image } onChange={onChangeSecondImage}/>
							</div>
							<ItemCardTitle>
						Карточка Акции
							</ItemCardTitle>
							<div className={cn(styles['product-items'])}>
								<ItemCardInputArea className={cn(styles['promo-area'], styles['promo-textarea'])}>
									<ItemCardInputLabel>Описание:</ItemCardInputLabel>
									<ItemCardTextArea content={description} onChangeContent={setDescription} errors={acceptClicked && isEmptyDesc(description)}/>    			
								</ItemCardInputArea>
								
								<ItemImagePreview image={image? image: promotion.main_image} onChange={onChangeImage} className={cn(styles['main-preview'])}/>
							</div>
							<div className={cn(styles['action-btns'])}>
								<SaveDeleteButton typeAction='accept' onClick={onClickSubmit}/>
								<SaveDeleteButton typeAction='delete' onClick={onClickDelete}/>
							</div>
							
						</>
					}
				</NewItemLayout>
				
				<ModalAskDelete isOpen={deleteClicked} closeModal={onClickDelete}
					message={`акцию "${promotion.name}"`} idItem={promotion?.id}
					onDelete={onDelete}/>
			</div>
		</section>
	
	);

}

export default EditPromotionCard;

