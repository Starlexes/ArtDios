import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootState } from '../store';

export interface UpdateCategory {
	id: number,
	data: UpdateCategoryState | UpdateSubCategoryState
}

export interface UpdateCategoryState {
	id?: number,
    name?: string,
	subcategory?: SubCategoryState[],
    is_show?: boolean,
	slug?: string,
	parent?: number
}

export interface UpdateSubCategoryState {
	id?: number,
    name?: string,
	discount?: number | null,
    is_show?: boolean,
	slug?: string,
	parent?: number
}

export interface SubCategoryState {
	id: number,
    name: string,
	discount: number | null,
    is_show: boolean,
	slug: string,
	parent: number
}

export interface CategoryState {
	id: number,
    name: string,
	subcategory: SubCategoryState[],
    is_show: boolean,
	slug: string,
	parent: number
}

export interface CategoriesState {
    categories: CategoryState[];
	subcategories: SubCategoryState[],
    isLoading: boolean;
    error: string | null;
}

const initialState: CategoriesState = {
	categories: [],
	subcategories: [],
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

export const updateCategory = createAsyncThunk<CategoryState, UpdateCategory, { rejectValue: string }>(
	'categories/updateCategory',
	async ({id, data}, { rejectWithValue }) => {
		
		try {
			const response = await axios.put(`/api/category/${id}/`, data);
			return response.data;
		
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось обновить категорию');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addCategory = createAsyncThunk<CategoryState, UpdateCategoryState, { rejectValue: string }>(
	'categories/addCategory',
	async (data, { rejectWithValue }) => {
		
		try {
			const response = await axios.post('/api/category/', data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось добавить категорию');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteCategory = createAsyncThunk<number, number, { rejectValue: string }>(
	'categories/deleteCategory',
	async (id, { rejectWithValue }) => {
		
		try {
			await axios.delete(`/api/category/${id}/`);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось удалить категорию');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);


export const updateSubCategory = createAsyncThunk<SubCategoryState, UpdateCategory, { rejectValue: string }>(
	'categories/updateSubCategory',
	async ({id, data}, { rejectWithValue }) => {
		
		try {
			const response = await axios.put(`/api/sub-category/${id}/`, data);
			return response.data;
		
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось обновить подкатегорию');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addSubCategory = createAsyncThunk<SubCategoryState, UpdateSubCategoryState, { rejectValue: string }>(
	'categories/addSubCategory',
	async (data, { rejectWithValue }) => {
		
		try {
			const response = await axios.post('/api/sub-category/', data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось добавить подкатегорию');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteSubCategory = createAsyncThunk<number, number, { rejectValue: string }>(
	'categories/deleteSubCategory',
	async (id, { rejectWithValue }) => {
		
		try {
			await axios.delete(`/api/sub-category/${id}/`);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось удалить подкатегорию');
			}
			
			return rejectWithValue((error as Error).message);
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

		addNewCategory(state, action: PayloadAction<CategoryState>) {
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
			state.subcategories = action.payload.flatMap(item => item.subcategory);
			state.isLoading = false;
		});
		builder.addCase(fetchCategory.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching category:', action.payload);
		});

		builder.addCase(updateCategory.fulfilled, (state, action: PayloadAction<CategoryState>) => {
			state.categories = state.categories.map(item => item.id === action.payload.id? action.payload: item );
		});
		builder.addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
			state.categories = state.categories.filter(item => item.id !== action.payload);
		});
		builder.addCase(addCategory.fulfilled, (state, action: PayloadAction<CategoryState>) => {
			state.categories = [...state.categories, action.payload];
		});

		builder.addCase(updateSubCategory.fulfilled, (state, action: PayloadAction<SubCategoryState>) => {
			state.categories = state.categories.map(category => 
				category.id === action.payload.parent 
					? { 
						...category, 
						subcategory: category.subcategory.map(sub => 
							sub.id === action.payload.id ? action.payload : sub
						)
					} 
					: category 
			);					
		});

		builder.addCase(deleteSubCategory.fulfilled, (state, action: PayloadAction<number>) => {
			
			state.categories = state.categories.map(category => {
				return { 
					...category, 
					subcategory: category.subcategory.filter(sub => sub.id !== action.payload) 
				}; 
			}	
			);
		});

		builder.addCase(addSubCategory.fulfilled, (state, action: PayloadAction<SubCategoryState>) => {
			state.categories = state.categories.map(category => 
				category.id === action.payload.parent?
					{
						...category, 
						subcategory: [...category.subcategory, action.payload] 
					}
					: category  
			);
		});
	}
});

export const { setCategory, addNewCategory } = categorySlice.actions;
export default categorySlice.reducer;
