import React, { Component } from 'react';

class PokedexContainer extends Component {
  state = {
    pokemon: []
  }

  componentDidMount(){
    // Gets the list of all pokemon in pokedex and renders a card for each
    fetch('https://pokeapi.co/api/v2/pokedex/1/')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let pokemonList = data.pokemon_entries.map((pokemon) => {
          const pokemonImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.entry_number}.png`;
          return (
            <div key={pokemon.entry_number}>
              <h2>{pokemon.pokemon_species.name}</h2>
              <img src={pokemonImg} alt={pokemon.pokemon_species.name}/>
            </div>
          )
        })
        this.setState({pokemon: pokemonList});
      }).catch((err) =>{
        console.log(`Pokedex failed to render because of ${err}`);
      });
  }

  render() {
    return <div>{this.state.pokemon}</div>
  }
}

export default PokedexContainer;