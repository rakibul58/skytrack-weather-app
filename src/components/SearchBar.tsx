import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { fetchWeather } from '../store/thunks';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchWeather(searchTerm.trim()));
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center border-2 rounded-lg overflow-hidden shadow-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-4 py-2 focus:outline-none dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;