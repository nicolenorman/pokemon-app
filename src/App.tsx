import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Pokemon from './components/Pokemon';
import { updatePokemonA, updatePokemonB } from './features/pokemonSlice';
import { useSelector } from 'react-redux';
import './App.css';
import { IPokemon, IResult, State, Move, MoveStats } from './types';
import { Button } from "antd";
import { ThunderboltOutlined } from '@ant-design/icons';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [battleResult, setBattleResult] = useState<string>('');
  const pokemonA = useSelector((state: State) => state.pokemon.pokemonA);
  const pokemonB = useSelector((state: State) => state.pokemon.pokemonB);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pokemonA.name && pokemonB.name) {
      setBattleResult(calculateResult(pokemonA, pokemonB));
    }
  }, [pokemonA, pokemonB]);

  const choosePokemon = async () => {
    setIsLoading(true);

    try {
      const pokemonList = await fetchJson('https://pokeapi.co/api/v2/pokemon/');
      const numPokemon = pokemonList.count;
      const pokemonAId = Math.floor(Math.random() * numPokemon) - 1;
      const pokemonBId = Math.floor(Math.random() * numPokemon) - 1;
  
      const pokemonAPick = await fetchJson(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonAId}&limit=1`);
      const pokemonAStats = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${pokemonAPick.results[0].name}`);
      const pokemonAMove = await getMove(pokemonAStats['moves']);
  
      const pokemonBPick = await fetchJson(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonBId}&limit=1`);
      const pokemonBStats = await fetchJson(`https://pokeapi.co/api/v2/pokemon/${pokemonBPick.results[0].name}`);
      const pokemonBMove = await getMove(pokemonBStats['moves']);
  
      dispatch(updatePokemonA({
        name: capitalize(pokemonAStats['name']),
        moveName: capitalize(pokemonAMove['name']),
        movePower: pokemonAMove['power'],
        image: pokemonAStats['sprites']['front_default']
      }));
  
      dispatch(updatePokemonB({
        name: capitalize(pokemonBStats['name']),
        moveName: capitalize(pokemonBMove['name']),
        movePower: pokemonBMove['power'],
        image: pokemonBStats['sprites']['back_default'] ?? pokemonBStats['sprites']['front_default']
      }));
    } catch (error) {
      console.error('Fetch error', error);
    }

    setIsLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="body">
          { pokemonA.name && pokemonB.name && 
            <div className="battleView">
              <Pokemon {...pokemonA} />
              <Pokemon {...pokemonB} />
            </div>
          }

          <div className="battleResult">
            { battleResult && 
              <h4>Battle Log</h4> 
            }

            <div className="battleLogWrap">
              { battleResult &&
                <div className="battleLog">
                    <span>{battleResult}</span>
                </div>
              }

              <Button
                type="primary"
                size="large"
                icon={<ThunderboltOutlined />}
                loading={isLoading}
                onClick={() => {choosePokemon()}}
              >
                Start Battle!
              </Button>
            </div>
          </div>
        </div>
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

function calculateResult(pokemonA: IPokemon, pokemonB: IPokemon) {
  const pokemonAMovePower = pokemonA.movePower ?? 0;
  const pokemonBMovePower = pokemonB.movePower ?? 0;
  const isTie = pokemonAMovePower === pokemonBMovePower;

  if (isTie) {
    return `The battle ends in a tie! Both ${pokemonA.name} and ${pokemonB.name} attack with equal moves.`;
  } else {
    const winner = pokemonAMovePower > pokemonBMovePower ? pokemonA : pokemonB;
    const loser = winner === pokemonA ? pokemonB : pokemonA;

    return `${winner.name} lands a decisive blow with ${winner.moveName} knocking out ${loser.name}!`;
  }
}

function capitalize(s: string) {
  return s[0].toUpperCase() + s.substr(1);
}

export default App;
