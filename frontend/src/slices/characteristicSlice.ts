import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


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
	}
});

export const { setChar } = charSlice.actions;
export default charSlice.reducer;
