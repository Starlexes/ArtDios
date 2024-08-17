import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Product} from './productSlice';
import axios from 'axios';

export interface ProductCardState {
    product: Product,
    isLoading: boolean,
	error: string | null;
}


const initialState: ProductCardState = {
	product: {
		product_id: 0,
		slug: '',
		name: '',
		description: '',
		price: 0,
		new_price: null,
		code: '',
		image: '',
		second_image: null,
		third_image: null,
		category: 0,
		category_name: '',
		characteristics: []
	},
	isLoading: false,
	error: null
};


export const fetchProductCard = createAsyncThunk<Product, string, { rejectValue: string }>(
	'productCard/fetchProductCard',
	async (productItem, { rejectWithValue  }) => {
		try {
			
			const response = await axios.get(`/api/product/${productItem}`);
			
			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);
  

const productCardSlice = createSlice({
	name: 'productCard',

	initialState,

	reducers: {
		setProductCard(state, action: PayloadAction<ProductCardState>) {
			state.product = action.payload.product;
		}
	}, 
    
	extraReducers: (builder) => {
		builder.addCase(fetchProductCard.pending, (state) => {
			state.isLoading = true;
			state.error = null;
			
		});
		builder.addCase(fetchProductCard.fulfilled, (state, action: PayloadAction<Product>) => {
			state.product = action.payload;
			state.isLoading = false;
			state.error = null;
		});
		builder.addCase(fetchProductCard.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching product card:', action.payload);
		});
	}
});

export const { setProductCard } = productCardSlice.actions;
export default productCardSlice.reducer;