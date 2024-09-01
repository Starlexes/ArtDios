import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';


export interface UpdateAddress {
    id?: number,
    address?: string
}

export interface UpdateAddressState {
    id: number,
    data: UpdateAddress
}

export interface Address {
	id: number,
	address: string
}

export interface AddressState {
	addresses: Address[],
	isLoading: boolean;
    error: string | null;
}

export const fetchAddress = createAsyncThunk<Address[], void, { rejectValue: string }>(
	'address/fetchAddress',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get('/api/address/' );
			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateAddress = createAsyncThunk<Address, UpdateAddressState, { rejectValue: string }>(
	'address/updateAddress',
	async ({id, data}, { rejectWithValue }) => {
		
		try {
			const response = await axios.put(`/api/address/${id}/`, data);
			
			return response.data;
		
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось обновить адрес');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addAddress = createAsyncThunk<Address, UpdateAddress, { rejectValue: string }>(
	'address/addAddress',
	async (data, { rejectWithValue }) => {
		
		try {
			const response = await axios.post('/api/address/', data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось добавить адрес');
			}			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteAddress = createAsyncThunk<number, number, { rejectValue: string }>(
	'address/deleteAddress',
	async (id, { rejectWithValue }) => {
		
		try {
			await axios.delete(`/api/address/${id}/`);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось удалить адрес');
			}
			return rejectWithValue((error as Error).message);
		}
	}
);

  
const initialState: AddressState = {
	addresses: [],
	isLoading: false,
	error: null
};

const addressSlice = createSlice({
	name: 'address',
	initialState,
	reducers: {
		setAddress(state, action: PayloadAction<Address[]>) {
			state.addresses = action.payload;
		}
	},

	extraReducers: (builder) => {
		builder.addCase(fetchAddress.pending, (state) => {
			state.isLoading = true;
			state.error = null;			
		});
        
		builder.addCase(fetchAddress.fulfilled, (state, action) => {	
			state.addresses = action.payload;
			state.isLoading = false;
		});
		
		builder.addCase(fetchAddress.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching address:', action.payload);
		});

		builder.addCase(updateAddress.fulfilled, (state, action: PayloadAction<Address>) => {
			state.addresses = state.addresses.map(item => item.id === action.payload.id? action.payload: item );
		});
		builder.addCase(deleteAddress.fulfilled, (state, action: PayloadAction<number>) => {
			state.addresses = state.addresses.filter(item => item.id !== action.payload);
		});
		builder.addCase(addAddress.fulfilled, (state, action: PayloadAction<Address>) => {
			state.addresses = [...state.addresses, action.payload];
		});
	}
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
