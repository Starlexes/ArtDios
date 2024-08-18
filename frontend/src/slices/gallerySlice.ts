import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


export interface Gallery {
    gallery_id: number,
    slug: string,
    name: string,
    description: string,
    image: string
}

export interface GalleryState {
    gallery: Gallery[];
    isLoading: boolean;
    error: string | null;
}

const initialState: GalleryState = {
	gallery: [],
	isLoading: false,
	error: null
};

export const fetchGallery = createAsyncThunk<Gallery[], void, { rejectValue: string }>(
	'gallery/fetchGallery',
	async (_, { rejectWithValue  }) => {
		try {		
			const response = await axios.get('/api/gallery/');			
			return response.data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);
  

const gallerySlice = createSlice({
	name: 'gallery',

	initialState,

	reducers: {
		setGallery(state, action: PayloadAction<GalleryState>) {
			state.gallery = action.payload.gallery;
		}
	}, 
    
	extraReducers: (builder) => {
		builder.addCase(fetchGallery.pending, (state) => {
			state.isLoading = true;
			state.error = null;
			
		});
		builder.addCase(fetchGallery.fulfilled, (state, action: PayloadAction<Gallery[]>) => {
			state.gallery = action.payload;
			state.isLoading = false;
			state.error = null;
		});
		builder.addCase(fetchGallery.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as string;
			console.error('Error fetching product card:', action.payload);
		});
	}
});

export const { setGallery } = gallerySlice.actions;
export default gallerySlice.reducer;
