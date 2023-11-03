import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/pokemon-list/PokemonList';
import MyPokemon from './pages/my-pokemon/MyPokemon';
import PokemonDetail from './pages/detail/PokemonDetail';
import { createContext, useState } from 'react';

export const GlobalContext = createContext();

function App() {
  const [state, setState] = useState([]);
  const value = {state, setState}

  return (
    <GlobalContext.Provider value={value}>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Index/>} />
          <Route path="/pokemon-detail/:id" element={<PokemonDetail/>} />
        </Route>
        <Route path="my-pokemon" element={<MyPokemon/>} />
      </Routes>
    </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
