import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface SearchButtonState {
        isClicked: boolean,
		initial: boolean
}

interface BurgerButtonState {
	isClicked: boolean
}

interface ClearButtonState {
	isClicked: boolean
}

interface CharsState {
	name: string,
	description: string
}

export interface SubmitFilterParams {
	minPrice?: string | undefined,
	maxPrice?: string | undefined,
	chars?: CharsState[] | undefined
}

interface SubmitButtonState {
	isClicked: boolean,
	filterparams: SubmitFilterParams
}
export interface ButtonsState {
    modalSearchButton: SearchButtonState,
	modalBurgerButton: BurgerButtonState,
	actionClearButton: ClearButtonState,
	actionSubmitButton: SubmitButtonState
}


const initialState: ButtonsState = {
	modalSearchButton: {
		isClicked: false,
		initial: true
	},
	modalBurgerButton: {
		isClicked: false
	},
	actionClearButton: {
		isClicked: false
	},
	actionSubmitButton: {
		isClicked: false,
		filterparams: {}
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
		},
		setClearClick(state, action: PayloadAction<boolean>) {
			state.actionClearButton.isClicked = action.payload;
			if (state.actionClearButton.isClicked){
				state.actionSubmitButton.filterparams = {};
			}
			
		},
		setSubmitClick(state, action: PayloadAction<boolean>) {
			state.actionSubmitButton.isClicked = action.payload;
			
		},
		clearSubmitFilterParams(state) {
			state.actionSubmitButton.filterparams = {};
		},
		setSubmitFilterParams(state, action: PayloadAction<SubmitFilterParams>) {
	
			return {
				...state,
				actionSubmitButton: {
					...state.actionSubmitButton,
					filterparams: {
						...state.actionSubmitButton.filterparams,
						...action.payload
					}
				}
			};
		}

	}
});

export const {
	setMediaSearchClick, setMediaSearchInitial, setMediaBurgerClick,
	setClearClick, setSubmitClick, setSubmitFilterParams, clearSubmitFilterParams
} = buttonSlice.actions;
export default buttonSlice.reducer;
