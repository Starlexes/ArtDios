import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './slices/contactSlice';
import categoryReducer from './slices/categorySlice';


const store = configureStore({
	reducer: {
		contacts: contactReducer,
		categories: categoryReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;