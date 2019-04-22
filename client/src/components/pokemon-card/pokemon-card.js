import React from 'react';

function PokemonCard (props) {

  let evolutionChain = null;
  !props.evolution ? evolutionChain ='LOADING' : evolutionChain = props.evolution.map((pokemon) => {
    const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.species_id}.png`;
    const pokemonLink = `/pokemon/${pokemon.species_id}`;
    return (
      <div key={pokemon.species_id}>
        <a href={pokemonLink}>
          <h2>{pokemon.species_name}</h2>
          <img src={pokemonImg} alt={pokemon.species_name}/>
        </a>
      </div>
    )
  });
  let pokemonDetails = {
    name: null,
    des: null,
    habitat: null,
    pokemonImg: null,
    stats: null
  };
  if(props.pokemon && props.pokeStats){
    pokemonDetails.des= props.pokemon.flavor_text_entries[9].flavor_text;
    pokemonDetails.name = props.pokemon.name;
    pokemonDetails.habitat = props.pokemon.habitat.name;
    pokemonDetails.pokemonImg = props.pokeStats.sprites.front_default
    pokemonDetails.stats = props.pokeStats.stats.map((stat) => { return (<div>{stat.stat.name}</div>)})
    
  }
  console.log(pokemonDetails.stats)
  return (
    <div>
      <a href="/">HOME</a>
      <br/>

      {pokemonDetails.name}

      <br/>
      <img src={pokemonDetails.pokemonImg} alt={pokemonDetails.name}/>
      <br/>
      {pokemonDetails.des}
      <br/>
      <br/>
      Height: {props.pokeStats ? props.pokeStats.height : null}
      <br/>
      Weight: {props.pokeStats ? props.pokeStats.weight : null}
      <br/>
      Habitat: {pokemonDetails.habitat}
      <br/>
      Stats: {pokemonDetails.stats}
      <br/>
      Evolution Chain: 
      {evolutionChain}
    </div>
      
  )
}
export default PokemonCard;