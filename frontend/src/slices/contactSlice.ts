import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';


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

export const fetchContacts = createAsyncThunk<ContactGetState, void, object>(
	'contacts/fetchContacts',
	async (_, { getState  }) => {
		const state= getState() as RootState ;
		
		if (state.contacts.phones.length > 0 || state.contacts.emails.length > 0) {
			return {
				phones: state.contacts.phones.map(phone => ({ number: phone })),
				emails: state.contacts.emails.map(email => ({ email })),
				addresses: state.contacts.addresses.map(address => ({ address })),
				working_hours: [{...state.contacts.workingHours}]			
					.map(hours => ({
						opening_hours: hours.openingHours,
						closing_hours: hours.closingHours
					}))
			} as ContactGetState;
		}
		const response = await axios.get('/api/contacts/');
		return response.data as ContactGetState;
	}
);
  
const initialState: ContactState = {
	phones: [],
	emails: [],
	addresses: [],
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
				...action.payload.working_hours[0],
				openingHours: action.payload.working_hours[0].opening_hours,
				closingHours: action.payload.working_hours[0].closing_hours
			};
		});
	}
});

export const { setPhones, setEmails, setAddresses, setWorkingHours } = contactSlice.actions;
export default contactSlice.reducer;
