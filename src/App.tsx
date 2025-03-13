import React from 'react';
import { useDispatch } from 'react-redux';
import Pokemon from './components/Pokemon';
import { updatePokemonA, updatePokemonB } from './features/pokemonSlice';
import { useSelector } from 'react-redux';
import './App.css';
import { State, Move, MoveStats } from './types';

function App() {
  const pokemonA = useSelector((state: State) => state.pokemon.pokemonA);
  const pokemonB = useSelector((state: State) => state.pokemon.pokemonB);
  const dispatch = useDispatch();

  const choosePokemon = async () => {
    try {
      const pokemonList = await fetchJson('https://pokeapi.co/api/v2/pokemon/');
      const numPokemon = pokemonList.count;
      const pokemonAId = Math.floor(Math.random() * numPokemon) - 1;
      const pokemonBId = Math.floor(Math.random() * numPokemon) - 1;
  
      const pokemonA = await fetchJson(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonAId}&limit=1`);
      const pokemonAStats = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${pokemonA.results[0].name}`);
      const pokemonAMove = await getMove(pokemonAStats['moves']);
  
      const pokemonB = await fetchJson(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonBId}&limit=1`);
      const pokemonBStats = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${pokemonB.results[0].name}`);
      const pokemonBMove = await getMove(pokemonBStats['moves']);
  
      dispatch(updatePokemonA({
        name: pokemonAStats['name'],
        moveName: pokemonAMove['name'],
        movePower: pokemonAMove['power'],
        image: pokemonAStats['sprites']['front_default']
      }));
  
      dispatch(updatePokemonB({
        name: pokemonBStats['name'],
        moveName: pokemonBMove['name'],
        movePower: pokemonBMove['power'],
        image: pokemonBStats['sprites']['back_default'] ?? pokemonBStats['sprites']['front_default']
      }));
    } catch (error) {
      console.error('Fetch error', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="battleView">
          { pokemonA.name && <Pokemon {...pokemonA} /> }
          { pokemonB.name && <Pokemon {...pokemonB} /> }
        </div>
        <button onClick={() => {choosePokemon()}}>Start Battle!</button>
      </header>
    </div>
  );
}

async function fetchJson(url: string) {
  const response = await fetch(url);
  return response.json();
};

async function getMove(moves: Move[] ): Promise<MoveStats> {
  const randomIndex = Math.floor(Math.random() * moves.length) - 1;
  const chosenMove = moves[randomIndex];
  const moveStats = await fetchJson(chosenMove['move']['url']);

  return moveStats;
}

export default App;
