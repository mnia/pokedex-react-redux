import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemon: builder.query({
      query: (name: string) => `pokemon/${name}`
    }),
    getPokemons: builder.query({
        query: (limit = 100 ) => `pokemon?limit=${limit}`,
        keepUnusedDataFor: 3600 // cache for 1 hour
    })
  })
})

export const { useGetPokemonQuery, useGetPokemonsQuery } = pokemonApi

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
