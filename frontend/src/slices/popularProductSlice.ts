import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


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
	}
});

export const { setPopProduct } = popProductSlice.actions;
export default popProductSlice.reducer;
