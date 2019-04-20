import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router} from 'react-router-dom'
import PokemonContainer from './components/pokemon-container/pokemon-container.js';
import PokedexContainer from './components/pokedex-container/pokedex-container.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header> */}
        <Router>
          <Route exact path="/" component={PokedexContainer} />
          <Route path="/pokemon/:id" component={PokemonContainer} />
        </Router>
      </div>
    );
  }
}

export default App;
