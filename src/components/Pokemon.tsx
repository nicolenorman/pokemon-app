import React from 'react';

type Props = {
  name?: string,
  image?: string,
  moveName?: string,
  movePower?: string
};

function Pokemon ({ name, image, moveName, movePower }: Props) {
  return (
      <div className="pokemon-card">
        <h2>{ name }</h2>
        <p>{ moveName }</p>
        <p>{ movePower }</p>
        <div><img src={ image } /></div>
      </div>
  );
}

export default Pokemon;