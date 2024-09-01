import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';


export interface UpdateWorkingHours {
    id?: number,
    opening_hours?: string,
    closing_hours?: string
}

export interface UpdateWorkingHoursState {
    id: number,
    data: UpdateWorkingHours
}

export interface WorkingHours {
	id: number,
	opening_hours: string,
	closing_hours: string
}

export interface WorkingHoursState {
	workingHours: WorkingHours[],
	isLoading: boolean;
    error: string | null;
}

export const fetchWorkingHours = createAsyncThunk<WorkingHours[], void, { rejectValue: string }>(
	'workingHours/fetchWorkingHours',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get('/api/working-hours/' );
			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateWorkingHours = createAsyncThunk<WorkingHours, UpdateWorkingHoursState, { rejectValue: string }>(
	'workingHours/updateWorkingHours',
	async ({id, data}, { rejectWithValue }) => {
		
		try {
			const response = await axios.put(`/api/working-hours/${id}/`, data);
			
			return response.data;
		
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось обновить время работы');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addWorkingHours = createAsyncThunk<WorkingHours, UpdateWorkingHours, { rejectValue: string }>(
	'workingHours/addWorkingHours',
	async (data, { rejectWithValue }) => {
		
		try {
			const response = await axios.post('/api/working-hours/', data);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось добавить время работы');
			}			
			return rejectWithValue((error as Error).message);
		}
	}
);


const initialState: WorkingHoursState= {
	workingHours: [],
	isLoading: false,
	error: null
};

const workingHoursSlice = createSlice({
	name: 'workingHours',
	initialState,
	reducers: {
		setWorkingHours(state, action: PayloadAction<WorkingHours[]>) {
			state.workingHours = action.payload;
		}
	},

	extraReducers: (builder) => {
		builder.addCase(fetchWorkingHours.pending, (state) => {
			state.isLoading = true;
			state.error = null;			
		});
        
		builder.addCase(fetchWorkingHours.fulfilled, (state, action) => {	
			state.workingHours = action.payload;
			state.isLoading = false;
		});
		
		builder.addCase(fetchWorkingHours.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching email:', action.payload);
		});

		builder.addCase(updateWorkingHours.fulfilled, (state, action: PayloadAction<WorkingHours>) => {
			state.workingHours = state.workingHours.map(item => item.id === action.payload.id? action.payload: item );
		});
		builder.addCase(addWorkingHours.fulfilled, (state, action: PayloadAction<WorkingHours>) => {
			state.workingHours = [...state.workingHours, action.payload];
		});
	}
});

export const { setWorkingHours } = workingHoursSlice.actions;
export default workingHoursSlice.reducer;
