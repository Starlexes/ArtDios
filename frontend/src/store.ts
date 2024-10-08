import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice';
import categoryReducer from './slices/categorySlice';
import buttonReducer from './slices/buttonSlice';
import productReducer from './slices/productSlice';
import productCardReducer from './slices/productCardSlice';
import galleryReducer from './slices/gallerySlice';
import popProductsReducer from './slices/popularProductSlice';
import promotionReducer from './slices/promotionSlice';
import promotionCardReducer from './slices/promotionCardSlice';
import productTypesReducer from './slices/productTypeSlice';
import phonesReducer from './slices/phoneSlice';
import emailsReducer from './slices/emailSlice';
import addressReducer from './slices/addressSlice';
import workingHoursReducer from './slices/workingHours';
import characteristicReducer, { CharacteristicClient, Characteristic } from './slices/characteristicSlice';
import { createSelector } from 'reselect';


const store = configureStore({
	reducer: {
		contacts: contactReducer,
		categories: categoryReducer,
		buttons: buttonReducer,
		products: productReducer,
		characteristics: characteristicReducer,
		productCard: productCardReducer,
		gallery: galleryReducer,
		popProducts: popProductsReducer,
		promotions: promotionReducer,
		promotionCard: promotionCardReducer,
		productTypes: productTypesReducer,
		phones: phonesReducer,
		emails: emailsReducer,
		address: addressReducer,
		workingHours: workingHoursReducer
	}
});

const phones = (state: RootState) => state.contacts.contacts.phones;

const chars = (state: RootState) => state.characteristics.chars;

const filteredCategory = (state: RootState) => state.categories.categories;

export const convertedChars = createSelector(
	[chars],
	(chars: Characteristic[]): CharacteristicClient[] => {
		return chars.length > 0? chars.reduce((acc: CharacteristicClient[], curr: Characteristic) => {
			const existing = acc.find(item => item.name === curr.name);

			if (existing) {
			
				const uniqueDescriptions = new Set(existing.description);
				uniqueDescriptions.add(curr.description);

				existing.description = Array.from(uniqueDescriptions);
			} else {
				acc.push({
					name: curr.name,
					description: [curr.description]
				});
			}
            
			return acc;
		}, []): [];
	}
);


export const selectPhones = createSelector(
	[phones],
	(phones) => phones.length > 0? phones.slice(0, 2): []
);

export const selectFilteredCategory = createSelector(
	[filteredCategory],
	(category) => category.length > 0? category
		.filter(item => item.is_show)
		.map(item => ({
			...item,
			subcategory: item.subcategory.filter(sub => sub.is_show)
		}))
		.filter(item => item.subcategory.length > 0) 
		: []
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;