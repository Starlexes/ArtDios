import styles from './MediaSubCategory.module.css';
import { MediaSubCategoryProps } from './MediaSubCategory.props';
import cn from 'classnames';
import Modal from 'react-modal';
import overlayStyles from '../../Modal/ModalStyles/ModalOverlay.module.css';
import MediaCategoryItem from '../MediaCategoryItem/MediaCategoryItem';
import { renderArrow } from '../../../utils/constants';
import NavItem from '../../Header/NavItem/NavItem';
import Button from '../../Header/Button/Button';
import ModalCatalogHead from '../../Modal/ModalCatalogHead/ModalCatalogHead';



function MediaSubCategory({ isOpen, onClose, onCloseCategory, className, subcategory, category }: MediaSubCategoryProps) {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			className={cn(styles['modal-window'], className)}
			overlayClassName={cn(overlayStyles['modal-overlay'], overlayStyles['overlay-catalog'])}
		>
			<ModalCatalogHead onClose={onCloseCategory}/>
			<div className={cn(styles['subcategory'])}>
				{subcategory && (
					<nav>
						<ul>
							<MediaCategoryItem
								key={category}
								borderItem={subcategory.length !== 0}
								className={cn(styles['subcat-item'])}
							>
								<Button className={cn(styles['back-btn'])} onClick={onClose}>
									{renderArrow()}
								</Button>
								
								<NavItem to={category as string} className={cn(styles['subcat-link'])} onClick={onCloseCategory}>									
									Все товары
								</NavItem>

							</MediaCategoryItem>
							{subcategory
								.filter((item) => item.is_show)
								.map((subcat, index, array) => (
									<MediaCategoryItem
										key={subcat.name}
										borderItem={index !== array.length - 1}
										className={cn(styles['subcat-item'])}
									>						
										<NavItem to={subcat.slug} className={cn(styles['subcat-link'])} onClick={onCloseCategory}>									
											{subcat.name}
										</NavItem>
									</MediaCategoryItem>
								))}
						</ul>
					</nav>
				)
				}
			</div>
		</Modal>
	);
}

export default MediaSubCategory;