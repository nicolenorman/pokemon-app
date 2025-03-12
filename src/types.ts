type Pokemon = {
  id: string
  name: string
  moveName: string
  movePower: string
  image: string
};

export type State = {
  pokemon: {
    pokemonA: Pokemon
    pokemonB: Pokemon
  }
};

export type Move = {
  move: {
    name: string;
    url: string;
  }
};

export type MoveStats = {
  name: string;
  power: number;
};