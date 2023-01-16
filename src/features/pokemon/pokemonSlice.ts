import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
