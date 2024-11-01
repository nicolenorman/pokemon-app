import React from 'react';
import { useDispatch } from 'react-redux';
import Pokemon from './components/Pokemon';
import { updatePokemonA, updatePokemonB } from './features/pokemonSlice';
import { useSelector } from 'react-redux';
import './App.css';
import { State } from './types';

function App() {
  const pokemonA = useSelector((state: State) => state.pokemon.pokemonA);
  const pokemonB = useSelector((state: State) => state.pokemon.pokemonB);
  const dispatch = useDispatch();

  const choosePokemon = async () => {
    try {
      const pokemonData = await fetchJson('https://pokeapi.co/api/v2/pokemon/');
      const numPokemon = pokemonData.count;
      const pokemonAId = Math.floor(Math.random() * numPokemon) - 1;
      const pokemonBId = Math.floor(Math.random() * numPokemon) - 1;
  
      const pokemonA = await fetchJson(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonAId}&limit=1`);
      const abilitiesA = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${pokemonA.results[0].name}`);
  
      const pokemonB = await fetchJson(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonBId}&limit=1`);
      const abilitiesB = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${pokemonB.results[0].name}`);
  
      dispatch(updatePokemonA({
        name: abilitiesA['name'],
        image: abilitiesA['sprites']['front_default']
      }));
  
      dispatch(updatePokemonB({
        name: abilitiesB['name'],
        image: abilitiesB['sprites']['back_default']
      }));
    } catch (error) {
      console.error('Fetch error', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Pokemon {...pokemonA} />
        <Pokemon {...pokemonB} />
        <button onClick={() => {choosePokemon()}}>Start Battle!</button>
      </header>
    </div>
  );
}

async function fetchJson(url: string) {
  const response = await fetch(url);
  return response.json();
};

export default App;
