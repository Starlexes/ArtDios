import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface UpdateProductType {
	id: number,
	data: ProductType
}

export interface ProductType {
	id?: number,
    name?: string,
    is_show?: boolean,
}

export interface ProductTypeState {
    productTypes: ProductType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductTypeState = {
	productTypes: [],
	isLoading: false,
	error: null
};

export const fetchProductType = createAsyncThunk<ProductType[], void, { rejectValue: string }>(
	'productTypes/fetchProductType',
	async (_, { rejectWithValue }) => {
		
		try {
			const response = await axios.get('/api/product-type/');
				
			return response.data as ProductType[];
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateProductType = createAsyncThunk<ProductType, UpdateProductType, { rejectValue: string }>(
	'productTypes/updateProductType',
	async ({id, data}, { rejectWithValue }) => {
		
		try {
			const response = await axios.put(`/api/product-type/${id}/`, data);
			return response.data;
		
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось обновить тип продукта');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addProductType = createAsyncThunk<ProductType, ProductType, { rejectValue: string }>(
	'productTypes/addProductType',
	async (data, { rejectWithValue }) => {
		
		try {
			const response = await axios.post('/api/product-type/', data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось добавить тип продукта');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteProductType = createAsyncThunk<number, number, { rejectValue: string }>(
	'productTypes/deleteProductType',
	async (id, { rejectWithValue }) => {
		
		try {
			await axios.delete(`/api/product-type/${id}/`);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось удалить тип продукта');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);
  

const productTypesSlice = createSlice({
	name: 'productTypes',

	initialState,

	reducers: {
		setProductTypes(state, action: PayloadAction<ProductType[]>) {
			state.productTypes = action.payload;
		}
	}, 
    
	extraReducers: (builder) => {
		builder.addCase(fetchProductType.pending, (state) => {
			state.isLoading = true;
			state.error = null;
			
		});
		builder.addCase(fetchProductType.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
			state.productTypes = action.payload;
			state.isLoading = false;
		});
		builder.addCase(fetchProductType.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching product type:', action.payload);
		});
		builder.addCase(updateProductType.fulfilled, (state, action: PayloadAction<ProductType>) => {
			state.productTypes = state.productTypes.map(item => item.id === action.payload.id? action.payload: item );
		});
		builder.addCase(deleteProductType.fulfilled, (state, action: PayloadAction<number>) => {
			state.productTypes = state.productTypes.filter(item => item.id !== action.payload);
		});
		builder.addCase(addProductType.fulfilled, (state, action: PayloadAction<ProductType>) => {
			state.productTypes = [...state.productTypes, action.payload];
		});
	}
});

export const { setProductTypes } = productTypesSlice.actions;
export default productTypesSlice.reducer;
