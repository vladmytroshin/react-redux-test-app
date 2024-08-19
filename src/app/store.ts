import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  selectedOption: string;
  discountCode: string;
  notes: string[];
}

const initialState: AppState = {
  selectedOption: 'Option A',
  discountCode: '',
  notes: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedOption: (state, action: PayloadAction<string>) => {
      state.selectedOption = action.payload;
    },
    setDiscountCode: (state, action: PayloadAction<string>) => {
      state.discountCode = action.payload;
    },
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = [...state.notes, action.payload];
    },
  },
});

export const { setSelectedOption, setDiscountCode, setNotes } = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;