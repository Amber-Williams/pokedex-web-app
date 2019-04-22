import React, { Component } from 'react';

class PokemonContainer extends Component {
  state = {
    pokeId: this.props.match.params.id,
    evolutionLink: null,
    evolution: null
  }
  componentDidMount(){
    this.getPokeSpec();
  }

  getEvoChain = async () => {
    //Gets pokemon's evolution chain
    await fetch(this.state.evolutionLink)
      .then((res) => {
        console.log(this.state.evolutionLink)
        console.log(this.state.test)
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
        console.log(evoChain)
        console.log(data.chain)
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
          evolutionLink: data.evolution_chain.url
        })
      })
    this.getEvoChain();
  }

  render(){
    return <div>POKEMON CONTAINTER</div>
  }
}

export default PokemonContainer;