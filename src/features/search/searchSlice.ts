import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// handle search history
interface SearchState {
    searchHistory: string[];
}

const initialState: SearchState = {
    searchHistory: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        addSearch: (state, action: PayloadAction<string>) => {
            state.searchHistory.push(action.payload)
        }
    }
})

export const { addSearch } = searchSlice.actions

export default searchSlice.reducer
