import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemonA: {
      id: null,
      name: null,
      moveName: null,
      movePower: null,
      image: null
    },
    pokemonB: {
      id: null,
      name: null,
      moveName: null,
      movePower: null,
      image: null
    }
  },
  reducers: {
    updatePokemonA(state, action) {
      state.pokemonA = {
        ...action.payload,
      }
    },
    updatePokemonB(state, action) {
      state.pokemonB = {
        ...action.payload,
      }
    },
  }
});

export const { updatePokemonA, updatePokemonB } = pokemonSlice.actions;
export default pokemonSlice.reducer;
