import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface SearchButtonState {
        isClicked: boolean,
		initial: boolean
}

interface BurgerButtonState {
	isClicked: boolean
}


export interface ButtonsState {
    modalSearchButton: SearchButtonState
	modalBurgerButton: BurgerButtonState
}


const initialState: ButtonsState = {
	modalSearchButton: {
		isClicked: false,
		initial: true
	},
	modalBurgerButton: {
		isClicked: false
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
		},
		setMediaBurgerClick(state, action: PayloadAction<boolean>) {
			state.modalBurgerButton.isClicked = action.payload;
		}

	}
});

export const { setMediaSearchClick, setMediaSearchInitial, setMediaBurgerClick } = buttonSlice.actions;
export default buttonSlice.reducer;
