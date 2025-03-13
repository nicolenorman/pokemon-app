import React from 'react';

type Props = {
  name?: string,
  image?: string,
  moveName?: string,
  movePower?: string
};

function Pokemon ({ name, image, moveName, movePower }: Props) {
  return (
      <div className="pokemonCard">
        <div className="pokemonData">
          <h2>{ name }</h2>
            <div className="attackData">
              <span>{ moveName }</span>
              {movePower && <span>: { movePower }</span> }
            </div>
        </div>
        <div className="pokemonImage"><img src={ image } /></div>
      </div>
  );
}

export default Pokemon;