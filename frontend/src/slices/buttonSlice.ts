import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface SearchButtonState 
	{
        isClicked: boolean,
		initial: boolean
}


export interface ButtonsState {
    modalSearchButton: SearchButtonState
}


const initialState: ButtonsState = {
	modalSearchButton: {
		isClicked: false,
		initial: true
	}
};

  
const buttonSlice = createSlice({
	name: 'button',

	initialState,

	reducers: {
		setMediaSearchClick(state, action: PayloadAction<boolean>) {
			state.modalSearchButton.isClicked = action.payload;
		},
		setMediaSearchInitial(state, action: PayloadAction<boolean>) {
			state.modalSearchButton.initial = action.payload;
		}
	}
});

export const { setMediaSearchClick, setMediaSearchInitial } = buttonSlice.actions;
export default buttonSlice.reducer;
