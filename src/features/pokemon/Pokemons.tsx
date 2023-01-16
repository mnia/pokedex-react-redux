import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-grid-system';

import { addSearch } from '../search/searchSlice';
import { useGetPokemonsQuery } from './pokemonSlice';
import Search from '../search/Search';
import SearchHistory from '../search/SearchHistory';
import { PokemonType as Pokemon } from '../../types';
import './Pokemons.css';

const getId = (url: string) => {
  const id = url.split('/')[url.split('/').length - 2];
  return id.padStart(3, '0');
};

export function Pokemons() {
  /*
  since pokemon api doesn't provide partial name search, 
  we get top 1000 pokemon names at once to provide a better search experience. 
  The data is relatively small (only name and url) and is cached using Redux Toolkit's query cache.
  */
  const { data, error, isLoading } = useGetPokemonsQuery(1000);
  const results = (data && data.results) || [];
  const [visiblePokemons, setVisiblePokemons] = useState<Pokemon[]>([]);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    const results = (data && data.results) || [];
    setVisiblePokemons(results.slice(0, 20));
  }, [data]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm !== '') {
      // if search term matches a full Pokemon name, add to search history and redirect to that Pokemon's page
      let hasItem = results.filter((pokemon: Pokemon) => pokemon.name.toLowerCase() === searchTerm.toLowerCase()).length > 0;
      if (hasItem) {
        dispatch(addSearch(searchTerm));
        return navigate(`/pokemon/${searchTerm}`);
      }
    }
  };

  const loadMore = () => {
    setVisiblePokemons((prev) => {
      return [...prev, ...results.slice(prev.length, prev.length + 20)];
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <Container>
      <Row>
        <Col xs={12} className="search-container">
          <Search data={results} onSearch={handleSearch} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={2}>
          <SearchHistory />
        </Col>
        <Col xs={12} md={10}>
          <Row>
            {visiblePokemons.map((pokemon: Pokemon) => (
              <Col xs={6} lg={3} key={pokemon.name}>
                <div className="card">
                  <div className="card-image-container">
                    <Link to={`/pokemon/${pokemon.name}`}>
                      <img
                        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getId(pokemon.url)}.png`}
                        height={150}
                        width={150}
                        alt={pokemon.name}
                      />
                    </Link>
                  </div>
                  <div className="card-id">#{getId(pokemon.url)}</div>
                  <span className="card-name">{pokemon.name}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="load-more-container">
          <button onClick={loadMore} className="load-more-button">Load More</button>
        </Col>
      </Row>
    </Container>
  );
}
