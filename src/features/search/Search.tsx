import React, { useState, useRef } from 'react';
import { PokemonType as Pokemon } from '../../types';
import './Search.css';

interface Props {
  data: Pokemon[];
  onSearch: (searchTerm: string) => void;
}

const Search: React.FC<Props> = ({ data, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<Pokemon[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const newSuggestions = data.filter(item =>
      item.name.toLowerCase().startsWith(e.target.value.toLowerCase())
    ).slice(0, 4); // limit to 4 suggestions
    setSuggestions(newSuggestions);
  };

  const handleSelect = (item: Pokemon) => {
    setSearchTerm(item.name);
    setSuggestions([]);
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <>
      <div className="search-box">
        <input ref={inputRef} type="text" value={searchTerm} onChange={handleChange} placeholder="Search..." />
        <button onClick={handleClick}>Search</button>
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map(item => (
              <li key={item.name} onClick={() => handleSelect(item)}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Search;
