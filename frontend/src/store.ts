import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice';
import categoryReducer from './slices/categorySlice';
import { createSelector } from 'reselect';


const store = configureStore({
	reducer: {
		contacts: contactReducer,
		categories: categoryReducer
	}
});

const phones = (state: RootState) => state.contacts.phones;

export const selectPhones = createSelector(
	[phones],
	(phones) => phones.slice(0, 2)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;