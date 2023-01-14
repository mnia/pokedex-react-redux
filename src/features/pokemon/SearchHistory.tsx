import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { RootState } from '../../app/store';
import './SearchHistory.css';

const SearchHistory: React.FC = () => {
  const searchHistory = useSelector((state: RootState) => state.search.searchHistory)

  return (
    <div className="history">
      <h5>Search History</h5>
      <ul>
        {searchHistory.map((term, index) => (
          <li key={index}>
            <Link to={`/pokemon/${term}`}>{term}</Link>
          </li>
        ))}
      </ul>
      {searchHistory.length === 0 && <p className='empty'>Nothing searched yet</p>}
    </div>
  )
}

export default SearchHistory;
