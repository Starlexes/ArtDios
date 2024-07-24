import { createSlice, PayloadAction } from '@reduxjs/toolkit';




export interface ContactState {
    phones: string[],
	emails: string[],
	addresses: string[],
	workingHours: {
		openingHours: Date,
		closingHours: Date
	}
  }
  
const initialState: ContactState = {
	phones: [''],
	emails: [''],
	addresses: [''],
	workingHours: {
		openingHours: new Date(),
		closingHours: new Date()
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
		setWorkingHours(state, action: PayloadAction<{ openingHours: Date; closingHours: Date }>) {
			state.workingHours = action.payload;
		}
	}
});

export const { setPhones, setEmails, setAddresses, setWorkingHours } = contactSlice.actions;
export default contactSlice.reducer;
