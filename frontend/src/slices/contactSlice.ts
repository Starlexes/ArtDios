import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


export interface ContactState {
	phones: string[],
	emails: string[],
	addresses: string[],
	workingHours: {
	openingHours: number,
	closingHours: number
	}
}
  
interface ContactGetState {
	phones: {number: string}[],
	emails: {email: string}[],
	addresses: {address: string}[],
	working_hours: {
	opening_hours: number,
	closing_hours: number
	}[]
}


export interface ContactsState {
	contacts: ContactState,
	isLoading: boolean;
    error: string | null;
}

export const fetchContacts = createAsyncThunk<ContactGetState, void, object>(
	'contacts/fetchContacts',
	async (_, { rejectWithValue  }) => {
	
		try {
			const response = await axios.get('/api/contacts/');
			return response.data as ContactGetState;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

  
const initialState: ContactsState = {
	contacts: {
		phones: [],
		emails: [],
		addresses: [],
		workingHours: {
			openingHours: Date.now(),
			closingHours: Date.now()
		}
	},
	isLoading: false,
	error: null
	
};

const contactSlice = createSlice({
	name: 'contact',
	initialState,
	reducers: {
		setPhones(state, action: PayloadAction<string[]>) {
			state.contacts.phones = action.payload;
		},
		setEmails(state, action: PayloadAction<string[]>) {
			state.contacts.emails = action.payload;
		},
		setAddresses(state, action: PayloadAction<string[]>) {
			state.contacts.addresses = action.payload;
		},
		setWorkingHours(state, action: PayloadAction<{ openingHours: number; closingHours: number }>) {
			state.contacts.workingHours = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchContacts.pending, (state) => {
			state.isLoading = true;
			state.error = null;
			
		});
		builder.addCase(fetchContacts.fulfilled, (state, action) => {
			
			state.contacts.emails = action.payload.emails.length > 0?
				action.payload.emails.map(item => item.email): [];
			state.contacts.phones = action.payload.phones.length > 0?
				action.payload.phones.map(item => item.number): [];
			state.contacts.addresses = action.payload.addresses.length > 0?
				action.payload.addresses.map(item => item.address): [];
			state.contacts.workingHours = action.payload.working_hours.length > 0? { 
				...action.payload.working_hours[0],
				openingHours: action.payload.working_hours[0].opening_hours,
				closingHours: action.payload.working_hours[0].closing_hours
			}: {
				openingHours: 0,
				closingHours: 0
			};
			state.isLoading = false;
		});
		
		builder.addCase(fetchContacts.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching contacts:', action.payload);
		});
	}
});

export const { setPhones, setEmails, setAddresses, setWorkingHours } = contactSlice.actions;
export default contactSlice.reducer;
