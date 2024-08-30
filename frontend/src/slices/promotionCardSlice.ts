import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Promotion } from './promotionSlice';


export interface PromotionCardState {
    promotion: Promotion,
    isLoading: boolean,
	error: string | null;
}


const initialState: PromotionCardState = {
	promotion: {
		id: 0,
		name: '',
		is_show: false,
		slug: '',
		description: '',
		main_image: '',
		second_image: ''
	},
	isLoading: false,
	error: null
};


export const fetchPromotionCard = createAsyncThunk<Promotion, string, { rejectValue: string }>(
	'promotionCard/fetchPromotionCard',
	async (promoItem, { rejectWithValue  }) => {
		try {			
			const response = await axios.get(`/api/promotions/${promoItem}`);			
			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);
  

const promotionCardSlice = createSlice({
	name: 'promotionCard',

	initialState,

	reducers: {
		setPromotionCard(state, action: PayloadAction<PromotionCardState>) {
			state.promotion = action.payload.promotion;
		}
	}, 
    
	extraReducers: (builder) => {
		builder.addCase(fetchPromotionCard.pending, (state) => {
			state.isLoading = true;
			state.error = null;
			
		});
		builder.addCase(fetchPromotionCard.fulfilled, (state, action: PayloadAction<Promotion>) => {
			state.promotion = action.payload;
			state.isLoading = false;
			state.error = null;
		});
		builder.addCase(fetchPromotionCard.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching product card:', action.payload);
		});
	}
});

export const { setPromotionCard } = promotionCardSlice.actions;
export default promotionCardSlice.reducer;