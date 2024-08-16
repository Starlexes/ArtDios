import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

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
	category_name: string
}

export type Sorting = 'asc' | 'desc' | null

export interface ProductParams {
    sortBy?: Sorting,
    minPrice?: string | null,
    maxPrice?: string | null,
    characteristic?: string[] | null,
    category?: string,
    admin?: boolean,
    search?: string
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
}

const initialState: ProductState = {
	products: {
		products: [],
		minPrice: 0,
		maxPrice: 0
	},
	isLoading: false,
	error: null,
	category: ''
};


export const fetchProduct = createAsyncThunk<Products, ProductParams, { rejectValue: string }>(
	'product/fetchProduct',
	async (params, { rejectWithValue }) => {
		try {
	
			const { sortBy, maxPrice, minPrice, characteristic, category } = params;

			const queryParams = {
				category: category,
				'sort-by': sortBy,
				'min-price': minPrice,
				'max-price': maxPrice,
				characteristic: characteristic
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
  

const productSlice = createSlice({
	name: 'product',

	initialState,

	reducers: {
		setProduct(state, action: PayloadAction<ProductState>) {
			state.products = action.payload.products;
		},
		setCategoryProduct(state, action: PayloadAction<string>) {
			state.category = action.payload;
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
	}
});

export const { setProduct, setCategoryProduct} = productSlice.actions;
export default productSlice.reducer;
