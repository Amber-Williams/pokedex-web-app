import React from 'react';
import './pokemon-card.css';

function PokemonCard (props) {

  let evolutionChain = null;
  !props.evolution ? evolutionChain ='LOADING' : evolutionChain = props.evolution.map((pokemon, index) => {
    const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.species_id}.png`;
    const pokemonLink = `/pokemon/${pokemon.species_id}`;
    if (index === props.evolution.length-1) {
      //Last pokemon in evolution chain should not have arrow
      return (
        <div>
          <div key={pokemon.species_id}>
            <a href={pokemonLink}>
              <h2>{pokemon.species_name.toUpperCase()}</h2>
              <img src={pokemonImg} alt={pokemon.species_name}/>
            </a>
          </div>
        </div>
      )
    }
    return (
      <div className="evoFirstChildren">
        <div key={pokemon.species_id}>
          <a href={pokemonLink}>
            <h2>{pokemon.species_name.toUpperCase()}</h2>
            <img src={pokemonImg} alt={pokemon.species_name}/>
          </a>
        </div>
        <h1>></h1>
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
    pokemonDetails.name = props.pokemon.name.toUpperCase();
    pokemonDetails.habitat = props.pokemon.habitat.name;
    pokemonDetails.pokemonImg = props.pokeStats.sprites.front_default
    pokemonDetails.stats = props.pokeStats.stats.map((stat) => { return (<div>{stat.stat.name}</div>)})
  }

  return (
    <div>
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
      <div className="evolutionChain">{evolutionChain}</div>
    </div>
      
  )
}
export default PokemonCard;