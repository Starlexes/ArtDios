import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export interface UpdatePromotionState {
	id: number,
	data: UpdatePromotion | FormData
}

export interface UpdatePromotion {
	id?: number,
	name?: string,
    is_show?: boolean,
    slug?: string,
    description?: string,
    main_image?: string,
    second_image?: string
}

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

export const updatePromotion= createAsyncThunk<Promotion, UpdatePromotionState, { rejectValue: string }>(
	'promotion/updatePromotion',
	async ({id, data}, { rejectWithValue }) => {
		
		try {
			const response = await axios.put(`/api/promotions/${id}/`, data);
			return response.data;
		
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось обновить акцию');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addPromotion= createAsyncThunk<Promotion, FormData, { rejectValue: string }>(
	'promotion/addPromotion',
	async (data, { rejectWithValue }) => {
		
		try {
			const response = await axios.post('/api/promotions/', data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось добавить акцию');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deletePromotion = createAsyncThunk<number, number, { rejectValue: string }>(
	'promotion/deletePromotion',
	async (id, { rejectWithValue }) => {
		
		try {
			await axios.delete(`/api/promotions/${id}/`);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось удалить акцию');
			}
			
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

		builder.addCase(updatePromotion.fulfilled, (state, action: PayloadAction<Promotion>) => {
			state.promo = state.promo.map(item => item.id === action.payload.id? action.payload: item );
		});
		builder.addCase(deletePromotion.fulfilled, (state, action: PayloadAction<number>) => {
			state.promo = state.promo.filter(item => item.id !== action.payload);
		});
		builder.addCase(addPromotion.fulfilled, (state, action: PayloadAction<Promotion>) => {
			state.promo = [...state.promo, action.payload];
		});
	}
});

export const { setPromotion } = promotionSlice.actions;
export default promotionSlice.reducer;
