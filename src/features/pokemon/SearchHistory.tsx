import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { RootState } from '../../app/store';

const SearchHistory: React.FC = () => {
  const searchHistory = useSelector((state: RootState) => state.search.searchHistory)

  return (
    <>
      <h5>Search History</h5>
      <ul>
        {searchHistory.map((term, index) => (
          <li key={index}>
            <Link to={`/pokemon/${term}`}>{term}</Link>
          </li>
        ))}        
      </ul>
    </>
  )
}

export default SearchHistory;
