export interface IPokemon {
  id: string
  name: string
  moveName: string
  movePower: string
  image: string
};

export interface IResult {
  winnerName: string,
  winnerMove: string,
  loserName: string
};

export type State = {
  pokemon: {
    pokemonA: IPokemon
    pokemonB: IPokemon
    result: IResult
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