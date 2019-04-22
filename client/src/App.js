import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { Route, BrowserRouter as Router} from 'react-router-dom'
import PokemonContainer from './components/pokemon-container/pokemon-container.js';
import PokedexContainer from './components/pokedex-container/pokedex-container.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a className={window.location.pathname !== "/" ? "apply" : null} href="/">
            <img src={logo} className={window.location.pathname !== "/" ? "App-logo" : "App-logo-dance"} alt="logo" />
          </a>
        </header>
        <Router>
          <Route exact path="/" component={PokedexContainer} />
          <Route path="/pokemon/:id" component={PokemonContainer} />
        </Router>
      </div>
    );
  }
}

export default App;
