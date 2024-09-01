import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';


export interface UpdateGallery {
	gallery_id?: number,
    slug?: string,
    name?: string,
    description?: string,
    image?: string
}

export interface UpdateGalleryState {
	id: number,
	data: FormData | UpdateGallery
}

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

export const updateGallery = createAsyncThunk<Gallery, UpdateGalleryState, { rejectValue: string }>(
	'gallery/updateGallery',
	async ({id, data}, { rejectWithValue }) => {
		
		try {
			const response = await axios.put(`/api/gallery/${id}/`, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			
			return response.data;
		
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось обновить галерею');
			}
			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addGallery = createAsyncThunk<Gallery, FormData, { rejectValue: string }>(
	'gallery/addGallery',
	async (data, { rejectWithValue }) => {
		
		try {
			const response = await axios.post('/api/gallery/', data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось добавить галерею');
			}			
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteGallery = createAsyncThunk<number, number, { rejectValue: string }>(
	'gallery/deleteGallery',
	async (id, { rejectWithValue }) => {
		
		try {
			await axios.delete(`/api/gallery/${id}/`);
			return id;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log('Не удалось удалить галерею');
			}
			
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
			console.error('Error fetching gallery:', action.payload);
		});

		builder.addCase(updateGallery.fulfilled, (state, action: PayloadAction<Gallery>) => {
			state.gallery = state.gallery.map(item => item.gallery_id === action.payload.gallery_id? action.payload: item );
		});
		builder.addCase(deleteGallery.fulfilled, (state, action: PayloadAction<number>) => {
			state.gallery = state.gallery.filter(item => item.gallery_id !== action.payload);
		});
		builder.addCase(addGallery.fulfilled, (state, action: PayloadAction<Gallery>) => {
			state.gallery = [...state.gallery, action.payload];
		});
	}
});

export const { setGallery } = gallerySlice.actions;
export default gallerySlice.reducer;
