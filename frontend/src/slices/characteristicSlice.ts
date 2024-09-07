import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';


export interface UpdateCharacteristic {
	char_id?: number,
    name?: string,
    description?: string,
    product?: number
}

export interface UpdateCharacteristicState {
	id: number,
	data: UpdateCharacteristic
}

export interface Characteristic {
    char_id: number,
    name: string,
    description: string,
    product: number
}

export interface CharacteristicClient {
    name: string,
    description: string[]
}


export interface CharParams {
    product?: string,
    category?: string,
}


export interface CharState {
    chars: Characteristic[],
    isLoading: boolean,
	error: string | null;
}

const initialState: CharState = {
	chars: [],
	isLoading: false,
	error: null
};


export const fetchCharacteristic = createAsyncThunk<Characteristic[], CharParams, { rejectValue: string }>(
	'characteristic/fetchCharacteristic',
	async (params, { rejectWithValue }) => {
		try {
			const response = await axios.get('/api/characteristic/', {params} );
			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateCharacteristic = createAsyncThunk<Characteristic, UpdateCharacteristic[], { rejectValue: string }>(
	'characteristic/updateCharacteristic',
	async (data, { rejectWithValue }) => {
		
		try {
			const response = await axios.put('/api/characteristic/', data);
			
			return response.data;
		
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось обновить характеристику');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addCharacteristic = createAsyncThunk<Characteristic, UpdateCharacteristic | UpdateCharacteristic[], { rejectValue: string }>(
	'characteristic/addCharacteristic',
	async (data, { rejectWithValue }) => {
		
		try {
			const response = await axios.post('/api/characteristic/', data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось добавить характеристику');
			}			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteCharacteristic = createAsyncThunk<number, number, { rejectValue: string }>(
	'characteristic/deleteCharacteristic',
	async (id, { rejectWithValue }) => {
		
		try {
			await axios.delete(`/api/characteristic/${id}/`);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось удалить характеристику');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

const charSlice = createSlice({
	name: 'characteristic',

	initialState,

	reducers: {
		setChar(state, action: PayloadAction<CharState>) {
			state.chars = action.payload.chars;
		}
		
	}, 
    
	extraReducers: (builder) => {
		builder.addCase(fetchCharacteristic.pending, (state) => {
			state.isLoading = true;
			state.error = null;
			
		});
		builder.addCase(fetchCharacteristic.fulfilled, (state, action: PayloadAction<Characteristic[]>) => {
			state.chars = action.payload;
			state.isLoading = false;
			state.error = null;
		});
		builder.addCase(fetchCharacteristic.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching characteristic:', action.payload);
		});

		builder.addCase(updateCharacteristic.fulfilled, (state, action: PayloadAction<Characteristic>) => {
			state.chars = state.chars.map(item => item.char_id === action.payload.char_id? action.payload: item );
		});
		builder.addCase(deleteCharacteristic.fulfilled, (state, action: PayloadAction<number>) => {
			state.chars = state.chars.filter(item => item.char_id !== action.payload);
		});
		builder.addCase(addCharacteristic.fulfilled, (state, action: PayloadAction<Characteristic>) => {
			state.chars = [...state.chars, action.payload];
		});
	}
});

export const { setChar } = charSlice.actions;
export default charSlice.reducer;
