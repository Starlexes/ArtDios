import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';


export interface UpdatePhone {
    id?: number,
    number?: string
}

export interface UpdatePhoneState {
    id: number,
    data: UpdatePhone
}

export interface Phone {
	id: number,
	number: string
}

export interface PhonesState {
	phones: Phone[],
	isLoading: boolean;
    error: string | null;
}

export const fetchPhone = createAsyncThunk<Phone[], void, { rejectValue: string }>(
	'phones/fetchPhone',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get('/api/phones/' );
			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updatePhone = createAsyncThunk<Phone, UpdatePhoneState, { rejectValue: string }>(
	'phones/updatePhone',
	async ({id, data}, { rejectWithValue }) => {
		
		try {
			const response = await axios.put(`/api/phones/${id}/`, data);
			
			return response.data;
		
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось обновить телефон');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addPhone = createAsyncThunk<Phone, UpdatePhone, { rejectValue: string }>(
	'phones/addPhone',
	async (data, { rejectWithValue }) => {
		
		try {
			const response = await axios.post('/api/phones/', data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось добавить телефон');
			}			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deletePhone = createAsyncThunk<number, number, { rejectValue: string }>(
	'phones/deletePhone',
	async (id, { rejectWithValue }) => {
		
		try {
			await axios.delete(`/api/phones/${id}/`);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось удалить телефон');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

  
const initialState: PhonesState = {
	phones: [],
	isLoading: false,
	error: null
};

const phonesSlice = createSlice({
	name: 'phones',
	initialState,
	reducers: {
		setPhone(state, action: PayloadAction<Phone[]>) {
			state.phones = action.payload;
		}
	},

	extraReducers: (builder) => {
		builder.addCase(fetchPhone.pending, (state) => {
			state.isLoading = true;
			state.error = null;			
		});
        
		builder.addCase(fetchPhone.fulfilled, (state, action) => {	
			state.phones = action.payload;
			state.isLoading = false;
		});
		
		builder.addCase(fetchPhone.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching phone:', action.payload);
		});

		builder.addCase(updatePhone.fulfilled, (state, action: PayloadAction<Phone>) => {
			state.phones = state.phones.map(item => item.id === action.payload.id? action.payload: item );
		});
		builder.addCase(deletePhone.fulfilled, (state, action: PayloadAction<number>) => {
			state.phones = state.phones.filter(item => item.id !== action.payload);
		});
		builder.addCase(addPhone.fulfilled, (state, action: PayloadAction<Phone>) => {
			state.phones = [...state.phones, action.payload];
		});
	}
});

export const { setPhone } = phonesSlice.actions;
export default phonesSlice.reducer;
