import React, { Component } from 'react';
import './pokedex-container.css';

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
          const pokemonLink = `/pokemon/${pokemon.entry_number}`
          return (
            <div className="pokedex-card" key={pokemon.entry_number}>
              <a href={pokemonLink}>
                <h2>{pokemon.pokemon_species.name}</h2>
                <img src={pokemonImg} alt={pokemon.pokemon_species.name}/>
              </a>
            </div>
          )
        })
        this.setState({pokemon: pokemonList});
      }).catch((err) =>{
        console.log(`Pokedex failed to render because of ${err}`);
      });
  }

  render() {
    return <div className="pokedexContainer">{this.state.pokemon}</div>
  }
}

export default PokedexContainer;