import {
  Routes,
  Route
} from "react-router-dom";
import Layout from "./components/Layout";
import NoMatch from "./components/NotFound";
import { Pokemons } from './features/pokemon/Pokemons';
import { PokemonDetails } from './features/pokemon/PokemonDetails';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Pokemons />} />
            <Route path="/pokemon/:name" element={<PokemonDetails />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>        
      </header>
    </div>
  );
}

export default App;
