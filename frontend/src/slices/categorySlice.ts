import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export interface SubCategoryState {
    name: string,
	discount?: number | undefined,
    is_show: boolean,
	slug: string
}

export const fetchCategory = createAsyncThunk<CategoryState[], void, object>(
	'categories/fetchCategory',
	async () => {
		const response = await axios.get('/api/classify/');
		return response.data as CategoryState[];
	}
);

export interface CategoryState {
    name: string,
	subcategory: SubCategoryState[],
    is_show: boolean,
	slug: string
}
  
const initialState: CategoryState[] = [];

const categorySlice = createSlice({
	name: 'category',

	initialState,

	reducers: {
		setCategory(_state, action: PayloadAction<CategoryState[]>) {
			return action.payload;
		},

		addCategory(state, action: PayloadAction<CategoryState>) {
			return [...state, action.payload];
		}
	}, 
    
	extraReducers: (builder) => {
		builder.addCase(fetchCategory.fulfilled, (_state, action) => {
			return action.payload;
		});
	}
});

export const { setCategory, addCategory } = categorySlice.actions;
export default categorySlice.reducer;
