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
	workingHours: {
	openingHours: number,
	closingHours: number
	}
  }

export const fetchContacts = createAsyncThunk<ContactGetState, void, object>(
	'contacts/fetchContacts',
	async () => {
		const response = await axios.get('/api/contacts/');
		return response.data as ContactGetState;
	}
);
  
const initialState: ContactState = {
	phones: [''],
	emails: [''],
	addresses: [''],
	workingHours: {
		openingHours: Date.now(),
		closingHours: Date.now()
	}
};

const contactSlice = createSlice({
	name: 'contact',
	initialState,
	reducers: {
		setPhones(state, action: PayloadAction<string[]>) {
			state.phones = action.payload;
		},
		setEmails(state, action: PayloadAction<string[]>) {
			state.emails = action.payload;
		},
		setAddresses(state, action: PayloadAction<string[]>) {
			state.addresses = action.payload;
		},
		setWorkingHours(state, action: PayloadAction<{ openingHours: number; closingHours: number }>) {
			state.workingHours = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchContacts.fulfilled, (state, action) => {
			state.emails = action.payload.emails.map(item => item.email);
			state.phones = action.payload.phones.map(item => item.number);
			state.addresses = action.payload.addresses.map(item => item.address);
			state.workingHours = { 
				...action.payload.workingHours,
				openingHours: action.payload.workingHours.openingHours,
				closingHours: action.payload.workingHours.closingHours
			};
		});
	}
});

export const { setPhones, setEmails, setAddresses, setWorkingHours } = contactSlice.actions;
export default contactSlice.reducer;
