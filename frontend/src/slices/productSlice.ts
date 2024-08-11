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

export interface Characteristic {
    name: string,
    description: string
}

export type Sorting = 'asc' | 'desc' | null

export interface ProductParams {
    sortBy?: Sorting,
    minPrice?: number,
    maxPrice?: number,
    characteristic?: Characteristic,
    category?: string,
    admin?: boolean,
    search?: string
}


export interface ProductState {
    products: Product[],
	category: string,
    isLoading: boolean,
	error: string | null;
}

const initialState: ProductState = {
	products: [],
	isLoading: false,
	error: null,
	category: ''
};


export const fetchProduct = createAsyncThunk<Product[], ProductParams, { rejectValue: string }>(
	'product/fetchProduct',
	async (params, { rejectWithValue }) => {
		try {

			const { sortBy, ...rest } = params;
			
			const apiParams = {
				...rest,
				'sort-by': sortBy
			};
			
			const response = await axios.get('/api/product/', {params: apiParams} );
			
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
		builder.addCase(fetchProduct.fulfilled, (state, action: PayloadAction<Product[]>) => {
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
