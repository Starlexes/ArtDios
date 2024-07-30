import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export interface SubCategoryState {
    name: string,
	discount?: number | undefined,
    is_show: boolean,
	slug: string
}

export interface CategoryState {
    name: string,
	subcategory: SubCategoryState[],
    is_show: boolean,
	slug: string
}

export interface CategoriesState {
    categories: CategoryState[];
    isLoading: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
	categories: [],
	isLoading: false,
	error: null
};

export const fetchCategory = createAsyncThunk<CategoryState[], void, { rejectValue: string }>(
	'categories/fetchCategory',
	async (_, { getState, rejectWithValue }) => {
		const state= getState() as RootState;
		
		if (state.categories.categories.length > 0) {
			return state.categories.categories;
		} else {
			try {
				const response = await axios.get('/api/classify/');
				
				return response.data as CategoryState[];
			} catch (error) {
				return rejectWithValue((error as Error).message);
			}
		}
		
	}
);
  

const categorySlice = createSlice({
	name: 'category',

	initialState,

	reducers: {
		setCategory(state, action: PayloadAction<CategoriesState>) {
			state.categories = action.payload.categories;
		},

		addCategory(state, action: PayloadAction<CategoryState>) {
			return {...state, categories: [...state.categories, action.payload]};
		}
	}, 
    
	extraReducers: (builder) => {
		builder.addCase(fetchCategory.pending, (state) => {
			state.isLoading = true;
			state.error = null;
			
		});
		builder.addCase(fetchCategory.fulfilled, (state, action: PayloadAction<CategoryState[]>) => {
			state.categories = action.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchCategory.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching contacts:', action.payload);
		});
	}
});

export const { setCategory, addCategory } = categorySlice.actions;
export default categorySlice.reducer;
