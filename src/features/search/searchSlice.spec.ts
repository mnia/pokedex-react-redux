import searchReducer, {
    addSearch
} from './searchSlice';

interface SearchState {
    searchHistory: string[];
}

describe('search reducer', () => {
    const initialState: SearchState = {
        searchHistory: []
    };

    it('should handle adding search to history', () => {
        const searchState = searchReducer(initialState, addSearch('example search'));
        expect(searchState.searchHistory).toEqual(['example search']);
    });

});
