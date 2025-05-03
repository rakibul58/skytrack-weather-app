import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchWeather } from '../store/thunks';
import { clearSearchHistory } from '../store/weatherSlice';

const SearchHistory: React.FC = () => {
  const { searchHistory } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>();

  if (searchHistory.length === 0) {
    return null;
  }

  const handleCityClick = (city: string) => {
    dispatch(fetchWeather(city));
  };

  const handleClearHistory = () => {
    dispatch(clearSearchHistory());
  };

  return (
    <div className="mt-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Recent Searches</h3>
        <button
          onClick={handleClearHistory}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {searchHistory.map((city) => (
          <button
            key={city}
            onClick={() => handleCityClick(city)}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm 
                     text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;