import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';


export interface UpdateEmail {
    id?: number,
    email?: string
}

export interface UpdateEmailState {
    id: number,
    data: UpdateEmail
}

export interface Email {
	id: number,
	email: string
}

export interface EmailState {
	emails: Email[],
	isLoading: boolean;
    error: string | null;
}

export const fetchEmail = createAsyncThunk<Email[], void, { rejectValue: string }>(
	'emails/fetchEmail',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get('/api/emails/' );
			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateEmail = createAsyncThunk<Email, UpdateEmailState, { rejectValue: string }>(
	'emails/updateEmail',
	async ({id, data}, { rejectWithValue }) => {
		
		try {
			const response = await axios.put(`/api/emails/${id}/`, data);
			
			return response.data;
		
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось обновить почту');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addEmail = createAsyncThunk<Email, UpdateEmail, { rejectValue: string }>(
	'emails/addEmail',
	async (data, { rejectWithValue }) => {
		
		try {
			const response = await axios.post('/api/emails/', data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось добавить почту');
			}			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteEmail = createAsyncThunk<number, number, { rejectValue: string }>(
	'emails/deleteEmail',
	async (id, { rejectWithValue }) => {
		
		try {
			await axios.delete(`/api/emails/${id}/`);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось удалить почту');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

  
const initialState: EmailState= {
	emails: [],
	isLoading: false,
	error: null
};

const emailSlice = createSlice({
	name: 'emails',
	initialState,
	reducers: {
		setEmail(state, action: PayloadAction<Email[]>) {
			state.emails = action.payload;
		}
	},

	extraReducers: (builder) => {
		builder.addCase(fetchEmail.pending, (state) => {
			state.isLoading = true;
			state.error = null;			
		});
        
		builder.addCase(fetchEmail.fulfilled, (state, action) => {	
			state.emails = action.payload;
			state.isLoading = false;
		});
		
		builder.addCase(fetchEmail.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching email:', action.payload);
		});

		builder.addCase(updateEmail.fulfilled, (state, action: PayloadAction<Email>) => {
			state.emails = state.emails.map(item => item.id === action.payload.id? action.payload: item );
		});
		builder.addCase(deleteEmail.fulfilled, (state, action: PayloadAction<number>) => {
			state.emails = state.emails.filter(item => item.id !== action.payload);
		});
		builder.addCase(addEmail.fulfilled, (state, action: PayloadAction<Email>) => {
			state.emails = [...state.emails, action.payload];
		});
	}
});

export const { setEmail } = emailSlice.actions;
export default emailSlice.reducer;
