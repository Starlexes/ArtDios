import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';


export interface UpdatePopularProductState{
	id?: number,
    image?: string,
    is_show?: boolean,
    category?: number
}

export interface UpdatePopularProduct {
	id: number,
	data: UpdatePopularProductState | FormData
}

export interface PopularProduct {
    id: number,
    image: string,
    is_show: boolean,
    category: number
}

export interface PopularProductState {
    popProducts: PopularProduct[];
    isLoading: boolean;
    error: string | null;
}

const initialState: PopularProductState = {
	popProducts: [],
	isLoading: false,
	error: null
};

export const fetchPopProduct = createAsyncThunk<PopularProduct[], void, { rejectValue: string }>(
	'popProduct/fetchPopProduct',
	async (_, { rejectWithValue  }) => {
		try {		
			const response = await axios.get('/api/popular-product/');			
			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updatePopularProduct= createAsyncThunk<PopularProduct, UpdatePopularProduct, { rejectValue: string }>(
	'popProduct/updatePopularProduct',
	async ({id, data}, { rejectWithValue }) => {
		
		try {
			const response = await axios.put(`/api/popular-product/${id}/`, data);
			return response.data;
		
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось обновить популярный продукт');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addPopularProduct = createAsyncThunk<PopularProduct, FormData, { rejectValue: string }>(
	'popProduct/addPopularProduct',
	async (data, { rejectWithValue }) => {
		
		try {
			const response = await axios.post('/api/popular-product/', data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось добавить популярный продукт');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deletePopularProduct = createAsyncThunk<number, number, { rejectValue: string }>(
	'popProduct/deletePopularProduct',
	async (id, { rejectWithValue }) => {
		
		try {
			await axios.delete(`/api/popular-product/${id}/`);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось удалить популярный продукт');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);
  

const popProductSlice = createSlice({
	name: 'popProduct',

	initialState,

	reducers: {
		setPopProduct(state, action: PayloadAction<PopularProductState>) {
			state.popProducts = action.payload.popProducts;
		}
	}, 
    
	extraReducers: (builder) => {
		builder.addCase(fetchPopProduct.pending, (state) => {
			state.isLoading = true;
			state.error = null;			
		});
		builder.addCase(fetchPopProduct.fulfilled, (state, action: PayloadAction<PopularProduct[]>) => {
			state.popProducts = action.payload;
			state.isLoading = false;
			state.error = null;
		});
		builder.addCase(fetchPopProduct.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching product card:', action.payload);
		});

		builder.addCase(updatePopularProduct.fulfilled, (state, action: PayloadAction<PopularProduct>) => {
			state.popProducts = state.popProducts.map(item => item.id === action.payload.id? action.payload: item );
		});
		builder.addCase(deletePopularProduct.fulfilled, (state, action: PayloadAction<number>) => {
			state.popProducts = state.popProducts.filter(item => item.id !== action.payload);
		});
		builder.addCase(addPopularProduct.fulfilled, (state, action: PayloadAction<PopularProduct>) => {
			state.popProducts = [...state.popProducts, action.payload];
		});
	}
});

export const { setPopProduct } = popProductSlice.actions;
export default popProductSlice.reducer;
