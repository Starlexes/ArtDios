import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice';
import categoryReducer from './slices/categorySlice';
import buttonReducer from './slices/buttonSlice';
import productReducer, { Characteristic } from './slices/productSlice';
import characteristicReducer, { CharacteristicClient } from './slices/characteristicSlice';
import { createSelector } from 'reselect';


const store = configureStore({
	reducer: {
		contacts: contactReducer,
		categories: categoryReducer,
		buttons: buttonReducer,
		products: productReducer,
		characteristics: characteristicReducer
	}
});

const phones = (state: RootState) => state.contacts.contacts.phones;

const chars = (state: RootState) => state.characteristics.chars;

const filteredCategory = (state: RootState) => state.categories.categories;

export const convertedChars = createSelector(
	[chars],
	(chars: Characteristic[]): CharacteristicClient[] => {
		return chars.reduce((acc: CharacteristicClient[], curr: Characteristic) => {
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
		}, []);
	}
);




export const selectPhones = createSelector(
	[phones],
	(phones) => phones.slice(0, 2)
);

export const selectFilteredCategory = createSelector(
	[filteredCategory],
	(category) => category.filter((item) => item.is_show)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;