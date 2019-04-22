import React, { Component } from 'react';
import PokemonCard from '../pokemon-card/pokemon-card';

class PokemonContainer extends Component {
  state = {
    pokeId: this.props.match.params.id,
    evolutionLink: null,
    evolution: null,
    pokemon: null,
    pokeStats: null
  }
  componentDidMount(){
    this.getPokeSpec();
  }

  getEvoChain = async () => {
    //Gets pokemon's evolution chain
    await fetch(this.state.evolutionLink)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const evoChain = [];
        let evoData = data.chain;
        do {
          const evoDetails = evoData['evolution_details'][0];
          const evoId = evoData.species.url.split('/')
          evoChain.push({
            "species_name": evoData.species.name,
            "species_id": Number(evoId[evoId.length-2]),
            "min_level": !evoDetails ? 1 : evoDetails.min_level,
          });

          evoData = evoData['evolves_to'][0];
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
        this.setState({
          evolution: evoChain
        })
      })
      .catch((err) =>{
        console.log(`Pokemon with id #${this.state.pokeId} failed to render because of ${err}`);
      });
  }

  getPokeSpec = async () => {
    //Gets pokemon's name, evolution chain url for fetch request
    await fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.state.pokeId}/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({
          evolutionLink: data.evolution_chain.url,
          pokemon: data
        })
      })
    this.getEvoChain();
    this.getPokeStats();
  }

  getPokeStats = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.pokeId}/`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      this.setState({
        pokeStats: data
      })
    })
  }

  render(){
    return <PokemonCard
      evolution={this.state.evolution}
      pokemon={this.state.pokemon}
      pokeId={this.state.pokeId}
      pokeStats={this.state.pokeStats}
      />
  }
}

export default PokemonContainer;