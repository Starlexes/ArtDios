import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


export interface Promotion {
    id: number,
	name: string,
    is_show: boolean,
    slug: string,
    description: string,
    main_image: string,
    second_image: string
}

export interface PromotionState {
    promo: Promotion[];
    isLoading: boolean;
    error: string | null;
}

const initialState: PromotionState = {
	promo: [],
	isLoading: false,
	error: null
};

export const fetchPromotion = createAsyncThunk<Promotion[], void, { rejectValue: string }>(
	'promotion/fetchPromotion',
	async (_, { rejectWithValue  }) => {
		try {		
			const response = await axios.get('/api/promotions/');			
			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);
  

const promotionSlice = createSlice({
	name: 'promotion',

	initialState,

	reducers: {
		setPromotion(state, action: PayloadAction<PromotionState>) {
			state.promo = action.payload.promo;
		}
	}, 
    
	extraReducers: (builder) => {
		builder.addCase(fetchPromotion.pending, (state) => {
			state.isLoading = true;
			state.error = null;			
		});
		builder.addCase(fetchPromotion.fulfilled, (state, action: PayloadAction<Promotion[]>) => {
			state.promo = action.payload;
			state.isLoading = false;
			state.error = null;
		});
		builder.addCase(fetchPromotion.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching product card:', action.payload);
		});
	}
});

export const { setPromotion } = promotionSlice.actions;
export default promotionSlice.reducer;
