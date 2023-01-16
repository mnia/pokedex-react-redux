import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { pokemonApi } from '../features/pokemon/pokemonSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokemonApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
