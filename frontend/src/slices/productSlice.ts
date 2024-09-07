import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Characteristic } from './characteristicSlice';


export interface Product {
    product_id: number,
    slug: string
    name: string,
    description: string,
    price: number,
    new_price: number | null,
    code: string,
    image: string,
    second_image: string | null,
    third_image: string | null,
    category: number
	category_name: string,
	characteristics: Characteristic[]
}

export interface UpdateProductCard {
	product_id?: number,
    slug?: string
    name?: string,
    description?: string,
    price?: number,
    new_price?: number | null,
    code?: string,
    image?: string,
    second_image?: string | null,
    third_image?: string | null,
    category?: number
	category_name?: string,
	characteristics?: Characteristic[]
}

export interface UpdateProductCardState {
	id: number,
	data: UpdateProductCard | FormData
}

export type Sorting = 'asc' | 'desc' | null

export interface ProductParams {
    sortBy?: Sorting,
    minPrice?: string | null,
    maxPrice?: string | null,
    characteristic?: string[] | null,
    category?: string | string[],
    admin?: boolean,
    search?: string,
}

export interface Products {
	products: Product[],
	minPrice: number,
	maxPrice: number
}

export interface ProductState {
    products: Products,
	category: string,
    isLoading: boolean,
	error: string | null;
	createdId: number | null;
}

const initialState: ProductState = {
	products: {
		products: [],
		minPrice: 0,
		maxPrice: 0
	},
	isLoading: false,
	error: null,
	category: '',
	createdId: null
};


export const fetchProduct = createAsyncThunk<Products, ProductParams, { rejectValue: string }>(
	'product/fetchProduct',
	async (params, { rejectWithValue }) => {
		try {
	
			const { sortBy, maxPrice, minPrice, characteristic, category, search, admin} = params;

			const queryParams = {
				category: category,
				admin: admin,
				'sort-by': sortBy,
				'min-price': minPrice,
				'max-price': maxPrice,
				characteristic: characteristic,
				search: search
				
			};
			
			const queryString = Object.entries(queryParams)
				.filter(([, value]) => Boolean(value))
				.map(([key, value]) => !Array.isArray(value)? `${key}=${encodeURIComponent(value || '')}`: 
					value.map(char => `${key}=${encodeURIComponent(char || '')}`).join('&'))
				.join('&');


			const response = await axios.get(`/api/product/?${queryString}`);
			
			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateProductCard = createAsyncThunk<Product, UpdateProductCardState, { rejectValue: string }>(
	'productCard/updateProductCard',
	async ({id, data}, { rejectWithValue }) => {
		
		try {
			const response = await axios.put(`/api/product/${id}/`, data);
			return response.data;
		
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось обновить продукт');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addProductCard = createAsyncThunk<Product, FormData, { rejectValue: string }>(
	'productCard/addProductCard',
	async (data, { rejectWithValue }) => {
		
		try {
			const response = await axios.post('/api/product/', data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось добавить продукт');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteProductCard = createAsyncThunk<number, number, { rejectValue: string }>(
	'productCard/deleteProductCard',
	async (id, { rejectWithValue }) => {
		
		try {
			await axios.delete(`/api/product/${id}/`);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось удалить продукт');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteProducts = createAsyncThunk<number[], number[], { rejectValue: string }>(
	'productCard/deleteProducts',
	async (ids, { rejectWithValue }) => {
		
		try {
			await axios.delete('/api/product/', {
				data: {
					ids: ids
				}
			});
			return ids;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось удалить продукты');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);
  

const productSlice = createSlice({
	name: 'product',

	initialState,

	reducers: {
		setProduct(state, action: PayloadAction<ProductState>) {
			state.products = action.payload.products;
		},
		setCategoryProduct(state, action: PayloadAction<string>) {
			state.category = action.payload;
		},
		clearId(state) {
			state.createdId = null;
		}
	}, 
    
	extraReducers: (builder) => {
		builder.addCase(fetchProduct.pending, (state) => {
			state.isLoading = true;
			state.error = null;
			
		});
		builder.addCase(fetchProduct.fulfilled, (state, action: PayloadAction<Products>) => {
			state.products = action.payload;
			state.isLoading = false;
			state.error = null;
		});
		builder.addCase(fetchProduct.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching products:', action.payload);
		});

		builder.addCase(updateProductCard.fulfilled, (state, action: PayloadAction<Product>) => {
			state.products.products = state.products.products.map(item => item.product_id === action.payload.product_id? action.payload: item );
		});
		builder.addCase(deleteProductCard.fulfilled, (state, action: PayloadAction<number>) => {
			state.products.products = state.products.products.filter(item => item.product_id !== action.payload);
		});
		builder.addCase(deleteProducts.fulfilled, (state, action: PayloadAction<number[]>) => {
			state.products.products = state.products.products.filter(item => !action.payload.includes(item.product_id));
		});
		builder.addCase(addProductCard.fulfilled, (state, action: PayloadAction<Product>) => {
			state.products.products = [...state.products.products, action.payload];
			state.createdId = action.payload.product_id;
		});
	}
});

export const { setProduct, setCategoryProduct, clearId} = productSlice.actions;
export default productSlice.reducer;
